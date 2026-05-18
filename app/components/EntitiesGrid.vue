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
  <section class="flex flex-col py-12 px-6 lg:px-12">
    <div class="flex flex-col gap-2 mb-28">
      <h2 class="text-2xl font-bold">Annuaire de recherche</h2>
      <p class="text-lg text-gray-400">
        Filtrez et trouvez des entités spécifiques dans notre annuaire.
        <span v-if="activeFilterCount" class="text-(--color-primary)">
          · {{ activeFilterCount }} filtre(s) actif(s)
        </span>
      </p>
    </div>

    <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
      <Filters />

      <div class="flex min-w-0 flex-1 flex-col gap-8">
        <p v-if="loading" class="text-sm text-gray-400">Chargement…</p>
        <p v-else-if="error" class="text-sm text-red-600">Erreur : {{ error }}</p>

        <template v-else>
          <div
            v-if="!paginatedEntities.length"
            class="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400 dark:border-gray-600"
          >
            Aucun résultat pour ces filtres.
          </div>

          <div v-else class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
            class="flex items-center justify-center gap-3"
            aria-label="Pagination"
          >
            <button
              type="button"
              class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              :disabled="currentPage === 1"
              aria-label="Page précédente"
              @click="goToPage(currentPage - 1)"
            >
              <Icon name="mdi:chevron-left" class="size-5" />
            </button>

            <div class="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1.5 dark:bg-gray-700">
              <template
                v-for="(item, index) in visiblePages"
                :key="item === 'ellipsis' ? `ellipsis-${index}` : item"
              >
                <span
                  v-if="item === 'ellipsis'"
                  class="px-2 text-sm font-medium text-gray-500 select-none"
                  aria-hidden="true"
                >…</span>
                <button
                  v-else
                  type="button"
                  class="flex size-9 items-center justify-center rounded-lg text-sm font-medium transition"
                  :class="item === currentPage
                    ? 'bg-(--color-primary) text-white shadow-md shadow-(--color-primary)/30'
                    : 'text-gray-600 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-900/40'"
                  :aria-current="item === currentPage ? 'page' : undefined"
                  @click="goToPage(item)"
                >
                  {{ item }}
                </button>
              </template>
            </div>

            <button
              type="button"
              class="flex size-10 shrink-0 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-40"
              :class="currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-700'
                : 'bg-(--color-primary) text-white shadow-md shadow-(--color-primary)/30 hover:opacity-90'"
              :disabled="currentPage === totalPages"
              aria-label="Page suivante"
              @click="goToPage(currentPage + 1)"
            >
              <Icon name="mdi:chevron-right" class="size-5" />
            </button>
          </nav>

          <p class="text-center text-sm text-gray-400">
            Page {{ currentPage }} sur {{ totalPages }}
            · {{ entities.length }} entité(s)
          </p>
        </template>
      </div>
    </div>
  </section>
</template>
