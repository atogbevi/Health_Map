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

    const selectClass = 'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm capitalize outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) dark:border-gray-600 dark:bg-gray-900'

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
  <aside class="w-full shrink-0 lg:w-80">
    <div class="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800">
      <header class="border-b border-gray-100 px-4 py-3 dark:border-gray-700">
        <h3 class="text-2xl font-semibold">Filtres</h3>
        <p class="text-lg text-gray-400">Affinez votre recherche</p>
      </header>

      <div class="flex flex-col gap-5 overflow-y-auto p-4">
        <!-- Canton -->
        <div class="flex flex-col gap-1.5">
          <label for="filter-canton" class="text-md font-semibold uppercase tracking-wide text-gray-500">
            Canton
          </label>
          <select
            id="filter-canton"
            v-model="selectedCanton"
            :class="selectClass"
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

        <!-- Commune -->
        <div class="flex flex-col gap-1.5">
          <label for="filter-commune" class="text-md font-semibold uppercase tracking-wide text-gray-500">
            Commune
          </label>
          <select
            id="filter-commune"
            v-model="selectedCommune"
            :class="selectClass"
            :disabled="!filterOptions.commune.length"
            >
            <option value="">Toutes les communes</option>
            <option
              v-for="option in filterOptions.commune"
              :key="option"
              :value="option">
              {{ formatLabel(option) }}
            </option>
          </select>
        </div>

        <!-- Préfecture -->
        <div class="flex flex-col gap-1.5">
          <label for="filter-prefecture" class="text-md font-semibold uppercase tracking-wide text-gray-500">
            Préfecture
          </label>
          <select
            id="filter-prefecture"
            v-model="selectedPrefecture"
            :class="selectClass"
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

        <!-- Catégories -->
        <div class="flex flex-col gap-2">
          <p class="text-md font-semibold uppercase tracking-wide text-gray-500">
            Catégorie
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in filterOptions.categorie"
              :key="option"
              type="button"
              class="rounded-full px-3 py-1.5 text-base font-medium transition"
              :class="isCategorieSelected(option)
                ? 'bg-(--color-primary) text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'"
              @click="toggleCategorie(option)"
            >
              {{ formatLabel(option) }}
            </button>
          </div>
        </div>
      </div>

      <footer class="flex gap-2 border-t border-gray-100 p-3 dark:border-gray-700">
        <button
          type="button"
          class="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          @click="onReset"
        >
          Réinitialiser
        </button>
        <button
          type="button"
          class="flex-1 rounded-xl bg-(--color-primary) py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          @click="onApply"
        >
          Appliquer
        </button>
      </footer>
    </div>
  </aside>
</template>
