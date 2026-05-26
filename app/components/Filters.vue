<script setup lang="ts">
import type { LocationFilterKey } from '~/composables/useEntityFilters'

const {
  pendingFilters,
  filterOptions,
  loadFilterOptions,
  loadAllFilterOptions,
  setLocationFilter,
  toggleCategorie,
  applyFilters,
  resetFilters,
} = useEntityFilters()

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function isCategorieSelected(value: string) {
  return pendingFilters.value.categorie.includes(value)
}

const selectedCanton = computed({
  get: () => pendingFilters.value.canton ?? '',
  set: (value: string) => onLocationChange('canton', value),
})

const selectedCommune = computed({
  get: () => pendingFilters.value.commune ?? '',
  set: (value: string) => onLocationChange('commune', value),
})

const selectedPrefecture = computed({
  get: () => pendingFilters.value.prefecture ?? '',
  set: (value: string) => onLocationChange('prefecture', value),
})

async function onLocationChange(key: LocationFilterKey, value: string) {
  setLocationFilter(key, value || null)

  if (key === 'canton') {
    await loadFilterOptions('commune')
    await loadFilterOptions('prefecture')
  }
  if (key === 'commune') {
    await loadFilterOptions('prefecture')
  }
}

async function onApply() {
  await applyFilters()
}

async function onReset() {
  await resetFilters()
}

onMounted(() => {
  loadAllFilterOptions()
})
</script>

<template>
  <aside class="w-full shrink-0 lg:w-72 xl:w-80">
    <div class="card sticky top-[calc(var(--header-height)+1rem)] flex flex-col overflow-hidden">
      <header class="border-b border-(--color-border) px-5 py-4">
        <div class="flex items-center gap-2.5">
          <span class="flex size-8 items-center justify-center rounded-control bg-(--color-primary-muted) text-(--color-primary)">
            <Icon name="mdi:filter-variant" class="size-4" />
          </span>
          <div>
            <h3 class="text-sm font-semibold text-(--color-text)">Filtres</h3>
            <p class="text-xs text-(--color-text-muted)">Affinez votre recherche</p>
          </div>
        </div>
      </header>

      <div class="flex max-h-[min(70vh,32rem)] flex-col gap-5 overflow-y-auto p-5">
        <div class="flex flex-col gap-1.5">
          <label for="filter-canton" class="label-overline">Canton</label>
          <select
            id="filter-canton"
            v-model="selectedCanton"
            class="input-control capitalize"
          >
            <option value="">Tous les cantons</option>
            <option
              v-for="option in filterOptions.canton"
              :key="option"
              :value="option"
            >
              {{ formatLabel(option) }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="filter-commune" class="label-overline">Commune</label>
          <select
            id="filter-commune"
            v-model="selectedCommune"
            class="input-control capitalize"
            :disabled="!filterOptions.commune.length"
          >
            <option value="">Toutes les communes</option>
            <option
              v-for="option in filterOptions.commune"
              :key="option"
              :value="option"
            >
              {{ formatLabel(option) }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="filter-prefecture" class="label-overline">Préfecture</label>
          <select
            id="filter-prefecture"
            v-model="selectedPrefecture"
            class="input-control capitalize"
            :disabled="!filterOptions.prefecture.length"
          >
            <option value="">Toutes les préfectures</option>
            <option
              v-for="option in filterOptions.prefecture"
              :key="option"
              :value="option"
            >
              {{ formatLabel(option) }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-2.5">
          <p class="label-overline">Catégorie</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in filterOptions.categorie"
              :key="option"
              type="button"
              class="chip capitalize"
              :class="isCategorieSelected(option) ? 'chip-active' : 'chip-default'"
              @click="toggleCategorie(option)"
            >
              {{ formatLabel(option) }}
            </button>
          </div>
        </div>
      </div>

      <footer class="flex gap-2 border-t border-(--color-border) p-4">
        <button
          type="button"
          class="btn btn-secondary flex-1"
          @click="onReset"
        >
          Réinitialiser
        </button>
        <button
          type="button"
          class="btn btn-primary flex-1"
          @click="onApply"
        >
          Appliquer
        </button>
      </footer>
    </div>
  </aside>
</template>
