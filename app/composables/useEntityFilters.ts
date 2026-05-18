import type { Entity } from '~~/shared/types/Entity'
import { createClient } from '@supabase/supabase-js'

export type LocationFilterKey = 'canton' | 'commune' | 'prefecture'

export interface EntityFilters {
  categorie: string[]
  canton: string | null
  commune: string | null
  prefecture: string | null
}

export const KNOWN_CATEGORIES = [
  'pharmacie',
  'hopital',
  'clinique',
  'institution',
  'startup',
] as const

function emptyFilters(): EntityFilters {
  return { categorie: [], canton: null, commune: null, prefecture: null }
}

export function useEntityFilters() {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
  )

  const entities = useState<Entity[]>('entity-filters-entities', () => [])
  const loading = useState('entity-filters-loading', () => false)
  const error = useState<string | null>('entity-filters-error', () => null)
  const pendingFilters = useState<EntityFilters>('entity-filters-pending', () => emptyFilters())
  const appliedFilters = useState<EntityFilters>('entity-filters-applied', () => emptyFilters())
  const filterOptions = useState<Record<LocationFilterKey | 'categorie', string[]>>(() => ({
    canton: [],
    commune: [],
    prefecture: [],
    categorie: [...KNOWN_CATEGORIES],
  }))

  async function fetchDistinctValues(
    column: LocationFilterKey | 'categorie',
    constraints: { canton?: string, commune?: string } = {},
  ): Promise<string[]> {
    const PAGE = 1000
    const values = new Set<string>()
    let from = 0

    while (true) {
      let query = supabase.from('entities').select(column).range(from, from + PAGE - 1)

      if (constraints.canton) query = query.eq('canton', constraints.canton)
      if (constraints.commune) query = query.eq('commune', constraints.commune)

      const { data, error: fetchError } = await query

      if (fetchError) {
        console.error(`[filter options:${column}]`, fetchError)
        break
      }

      for (const row of data ?? []) {
        const value = (row as Record<string, string>)[column]
        if (value?.trim()) values.add(value.trim())
      }

      if (!data?.length || data.length < PAGE) break
      from += PAGE
    }

    return [...values].sort((a, b) => a.localeCompare(b, 'fr'))
  }

  async function loadFilterOptions(key: LocationFilterKey | 'categorie') {
    if (key === 'categorie') {
      const fromDb = await fetchDistinctValues('categorie')
      const merged = new Set<string>([...KNOWN_CATEGORIES, ...fromDb])
      filterOptions.value = {
        ...filterOptions.value,
        categorie: [...merged].sort((a, b) => a.localeCompare(b, 'fr')),
      }
      return
    }

    const pending = pendingFilters.value
    const constraints: { canton?: string, commune?: string } = {}

    if (key !== 'canton' && pending.canton) constraints.canton = pending.canton
    if (key === 'prefecture' && pending.commune) constraints.commune = pending.commune

    const values = await fetchDistinctValues(key, constraints)
    filterOptions.value = { ...filterOptions.value, [key]: values }
  }

  async function loadAllFilterOptions() {
    await Promise.all([
      loadFilterOptions('canton'),
      loadFilterOptions('categorie'),
      loadFilterOptions('commune'),
      loadFilterOptions('prefecture'),
    ])
  }

  async function fetchEntities() {
    loading.value = true
    error.value = null

    let query = supabase.from('entities').select('*')
    const f = appliedFilters.value

    if (f.categorie.length === 1) query = query.eq('categorie', f.categorie[0]!)
    else if (f.categorie.length > 1) query = query.in('categorie', f.categorie)

    if (f.canton) query = query.eq('canton', f.canton)
    if (f.commune) query = query.eq('commune', f.commune)
    if (f.prefecture) query = query.eq('prefecture', f.prefecture)

    const { data, error: supabaseError } = await query

    if (supabaseError) {
      error.value = supabaseError.message
      entities.value = []
      console.error('[entities]', supabaseError)
    } else {
      entities.value = [...(data ?? [])]
    }

    loading.value = false
  }

  function setLocationFilter(key: LocationFilterKey, value: string | null) {
    const next: EntityFilters = {
      ...pendingFilters.value,
      [key]: value || null,
    }

    if (key === 'canton') {
      next.commune = null
      next.prefecture = null
    }
    if (key === 'commune') {
      next.prefecture = null
    }

    pendingFilters.value = next
  }

  function toggleCategorie(value: string) {
    const current = [...pendingFilters.value.categorie]
    const index = current.indexOf(value)
    if (index === -1) current.push(value)
    else current.splice(index, 1)

    pendingFilters.value = {
      ...pendingFilters.value,
      categorie: current,
    }
  }

  async function applyFilters() {
    appliedFilters.value = {
      categorie: [...pendingFilters.value.categorie],
      canton: pendingFilters.value.canton,
      commune: pendingFilters.value.commune,
      prefecture: pendingFilters.value.prefecture,
    }
    await fetchEntities()
  }

  async function resetFilters() {
    pendingFilters.value = emptyFilters()
    appliedFilters.value = emptyFilters()
    await loadAllFilterOptions()
    await fetchEntities()
  }

  const activeFilterCount = computed(() => {
    const f = appliedFilters.value
    let count = f.categorie.length
    if (f.canton) count++
    if (f.commune) count++
    if (f.prefecture) count++
    return count
  })

  return {
    entities,
    loading,
    error,
    pendingFilters,
    appliedFilters,
    filterOptions,
    activeFilterCount,
    fetchEntities,
    loadFilterOptions,
    loadAllFilterOptions,
    setLocationFilter,
    toggleCategorie,
    applyFilters,
    resetFilters,
  }
}
