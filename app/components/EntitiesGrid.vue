<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const {
  entities,
  loading,
  error,
  activeFilterCount,
  fetchEntities,
} = useEntityFilters()

const currentPage = ref(1)
const PAGE_SIZE = 9

const totalPages = computed(() =>
  Math.max(1, Math.ceil(entities.value.length / PAGE_SIZE)),
)

const paginatedEntities = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return entities.value.slice(start, start + PAGE_SIZE)
})

type PaginationItem = number | 'ellipsis'

const EDGE_SIZE = 4

function buildVisiblePages(current: number, total: number): PaginationItem[] {
  if (total <= EDGE_SIZE * 2) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items: PaginationItem[] = []
  const lastBlockStart = total - EDGE_SIZE + 1

  if (current <= EDGE_SIZE) {
    for (let i = 1; i <= EDGE_SIZE; i++) items.push(i)
    items.push('ellipsis')
    for (let i = lastBlockStart; i <= total; i++) items.push(i)
  } else if (current >= lastBlockStart) {
    for (let i = 1; i <= EDGE_SIZE; i++) items.push(i)
    items.push('ellipsis')
    for (let i = lastBlockStart; i <= total; i++) items.push(i)
  } else {
    items.push(1)
    items.push('ellipsis')
    for (let i = current - 1; i <= current + 1; i++) items.push(i)
    items.push('ellipsis')
    items.push(total)
  }

  return items
}

const visiblePages = computed(() =>
  buildVisiblePages(currentPage.value, totalPages.value),
)

watch(entities, () => {
  currentPage.value = 1
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

onMounted(() => {
  fetchEntities()
})
</script>

<template>
  <section class="page-section">
    <div class="page-container">
      <header class="page-header">
        <h2 class="page-title">Annuaire de recherche</h2>
        <p class="page-subtitle">
          Filtrez et trouvez des prestataires spécifiques dans notre réseau.
          <span v-if="activeFilterCount" class="text-(--color-primary)">
            · {{ activeFilterCount }} filtre(s) actif(s)
          </span>
        </p>
      </header>

      <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <Filters />

        <div class="min-w-0 flex-1 flex flex-col gap-8">
          <div v-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="n in 6"
              :key="n"
              class="card flex flex-col gap-4 p-5"
            >
              <div class="skeleton h-10 w-10 rounded-control" />
              <div class="skeleton h-3 w-20" />
              <div class="skeleton h-5 w-3/4" />
              <div class="skeleton h-4 w-full" />
              <div class="skeleton h-4 w-2/3" />
            </div>
          </div>

          <div
            v-else-if="error"
            class="empty-state border-(--color-danger)/30 bg-(--color-danger-muted)"
          >
            <span class="empty-state-icon bg-(--color-danger-muted) text-(--color-danger)">
              <Icon name="mdi:alert-circle-outline" class="size-5" />
            </span>
            <p class="font-medium text-(--color-text)">Impossible de charger les entités</p>
            <p class="text-sm text-(--color-text-secondary)">{{ error }}</p>
          </div>

          <div
            v-else-if="!paginatedEntities.length"
            class="empty-state"
          >
            <span class="empty-state-icon">
              <Icon name="mdi:folder-search-outline" class="size-5" />
            </span>
            <p class="font-medium text-(--color-text)">Aucune entité trouvée</p>
            <p class="text-sm text-(--color-text-secondary)">
              Ajustez vos filtres ou réinitialisez la recherche.
            </p>
          </div>

          <template v-else>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <EntityCard
                v-for="entity in paginatedEntities"
                :key="entity.id"
                :id="entity.id"
                :nom="entity.nom"
                :categorie="entity.categorie"
                :description="entity.description"
                :canton="entity.canton"
                :jours_ouverture="entity.jours_ouverture"
              />
            </div>

            <nav
              v-if="totalPages > 1"
              class="flex flex-col items-center gap-4"
              aria-label="Pagination"
            >
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="btn btn-secondary flex size-9 items-center justify-center p-0"
                  :disabled="currentPage === 1"
                  aria-label="Page précédente"
                  @click="goToPage(currentPage - 1)"
                >
                  <Icon name="mdi:chevron-left" class="size-5" />
                </button>

                <div class="flex items-center gap-1 rounded-control border border-(--color-border) bg-(--color-surface) p-1 shadow-soft">
                  <template
                    v-for="(item, index) in visiblePages"
                    :key="item === 'ellipsis' ? `ellipsis-${index}` : item"
                  >
                    <span
                      v-if="item === 'ellipsis'"
                      class="px-2 text-sm font-medium text-(--color-text-muted) select-none"
                      aria-hidden="true"
                    >…</span>
                    <button
                      v-else
                      type="button"
                      class="flex size-8 items-center justify-center rounded-[0.4rem] text-sm font-medium transition"
                      :class="item === currentPage
                        ? 'bg-(--color-primary) text-white shadow-sm'
                        : 'text-(--color-text-secondary) hover:bg-(--color-surface-muted)'"
                      :aria-current="item === currentPage ? 'page' : undefined"
                      @click="goToPage(item)"
                    >
                      {{ item }}
                    </button>
                  </template>
                </div>

                <button
                  type="button"
                  class="btn flex size-9 items-center justify-center p-0"
                  :class="currentPage === totalPages ? 'btn-secondary' : 'btn-primary'"
                  :disabled="currentPage === totalPages"
                  aria-label="Page suivante"
                  @click="goToPage(currentPage + 1)"
                >
                  <Icon name="mdi:chevron-right" class="size-5" />
                </button>
              </div>

              <p class="text-sm text-(--color-text-muted)">
                Page {{ currentPage }} sur {{ totalPages }}
                · {{ entities.length }} entité(s)
              </p>
            </nav>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
