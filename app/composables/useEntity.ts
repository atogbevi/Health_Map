import type { Entity } from '~~/shared/types/Entity'
import { createClient } from '@supabase/supabase-js'

export function useEntity() {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
  )

  async function fetchEntityById(id: number): Promise<Entity | null> {
    const { data, error } = await supabase
      .from('entities')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error('[entity]', error)
      throw error
    }

    return data
  }

  return { fetchEntityById }
}
