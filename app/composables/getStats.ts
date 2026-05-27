import { createClient } from '@supabase/supabase-js'
import type { LocalityStats, LocalityType, Stats } from '~~/shared/types/Stats'

function createSupabaseClient() {
  const config = useRuntimeConfig()
  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
  )
}

const CATEGORY_KEYS = ['pharmacie', 'hopital', 'clinique', 'institution', 'startup', 'laboratoire'] as const
type CategoryKey = (typeof CATEGORY_KEYS)[number]

function emptyLocalityStats(name: string): LocalityStats {
  return {
    name,
    total: 0,
    pharmacie: 0,
    hopital: 0,
    clinique: 0,
    institution: 0,
    startup: 0,
    laboratoire: 0,
  }
}

function normalizeCategory(raw: string): CategoryKey | null {
  const value = raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')

  if (CATEGORY_KEYS.includes(value as CategoryKey)) return value as CategoryKey
  if (value === 'hopitaux' || value === 'hospital') return 'hopital'
  if (value === 'cliniques') return 'clinique'
  if (value === 'institutions') return 'institution'
  if (value === 'startups' || value === 'health tech') return 'startup'
  if (value === 'pharmacies') return 'pharmacie'
  if (value === 'laboratoires' || value === 'labo') return 'laboratoire'

  return null
}

function addEntityToLocality(
  aggregated: Map<string, LocalityStats>,
  locationName: string,
  categorie: string,
) {
  const category = normalizeCategory(categorie)
  if (!category) return

  const current = aggregated.get(locationName) ?? emptyLocalityStats(locationName)
  current[category] += 1
  current.total += 1
  aggregated.set(locationName, current)
}

export async function getTopLocalities(
  locationType: LocalityType,
  limit = 5,
): Promise<LocalityStats[]> {
  const supabase = createSupabaseClient()
  const PAGE = 1000
  const MAX_PAGES = 50
  let from = 0
  let page = 0
  const aggregated = new Map<string, LocalityStats>()

  while (page < MAX_PAGES) {
    const { data, error } = await supabase
      .from('entities')
      .select(`${locationType}, categorie`)
      .order('id', { ascending: true })
      .range(from, from + PAGE - 1)

    if (error) {
      console.error(`[top localities:${locationType}]`, error)
      break
    }

    if (!data?.length) break

    for (const row of data) {
      const record = row as Record<string, string>
      const name = record[locationType]?.trim()
      const categorie = record.categorie

      if (!name || !categorie) continue
      addEntityToLocality(aggregated, name, categorie)
    }

    if (data.length < PAGE) break
    from += PAGE
    page += 1
  }

  return [...aggregated.values()]
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, 'fr'))
    .slice(0, limit)
}

export async function getStats(): Promise<Stats> {
  const supabase = createSupabaseClient()
  const stats: Stats = {
    pharmacies: 0,
    hopitaux: 0,
    cliniques: 0,
    centres_de_sante: 0,
    institutions: 0,
    health_tech: 0,
    laboratoires: 0,
    total: 0,
  }

  const [pharmacies, hopitaux, cliniques, institutions, healthTech, laboratoires, total] = await Promise.all([
    supabase.from('entities').select('*', { count: 'exact', head: true }).eq('categorie', 'pharmacie'),
    supabase.from('entities').select('*', { count: 'exact', head: true }).eq('categorie', 'hopital'),
    supabase.from('entities').select('*', { count: 'exact', head: true }).eq('categorie', 'clinique'),
    supabase.from('entities').select('*', { count: 'exact', head: true }).eq('categorie', 'institution'),
    supabase.from('entities').select('*', { count: 'exact', head: true }).eq('categorie', 'startup'),
    supabase.from('entities').select('*', { count: 'exact', head: true }).eq('categorie', 'laboratoire'),
    supabase.from('entities').select('*', { count: 'exact', head: true }),
  ])

  stats.pharmacies = pharmacies.count ?? 0
  stats.hopitaux = hopitaux.count ?? 0
  stats.cliniques = cliniques.count ?? 0
  stats.centres_de_sante = stats.hopitaux + stats.cliniques
  stats.institutions = institutions.count ?? 0
  stats.health_tech = healthTech.count ?? 0
  stats.laboratoires = laboratoires.count ?? 0
  stats.total = total.count ?? 0

  return stats
}
