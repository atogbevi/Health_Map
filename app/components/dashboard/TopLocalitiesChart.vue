<script setup lang="ts">
import { getTopLocalities } from '~/composables/getStats'
import type { LocalityStats, LocalityType } from '~~/shared/types/Stats'
import { KNOWN_CATEGORIES } from '~/composables/useEntityFilters'
import { Chart } from 'chart.js/auto'

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const locationTypes: { id: LocalityType, label: string }[] = [
  { id: 'commune', label: 'Communes' },
  { id: 'canton', label: 'Cantons' },
  { id: 'prefecture', label: 'Préfectures' },
]

const CATEGORY_META = [
  { key: 'pharmacie' as const, label: 'Pharmacie', color: '#155dfc' },
  { key: 'hopital' as const, label: 'Hôpital', color: '#016630' },
  { key: 'clinique' as const, label: 'Clinique', color: '#22c55e' },
  { key: 'institution' as const, label: 'Institution', color: '#9810fa' },
  { key: 'startup' as const, label: 'Startup', color: '#ff6900' },
].filter(item => (KNOWN_CATEGORIES as readonly string[]).includes(item.key))

const selectedType = ref<LocalityType>('commune')

const { data: topLocalities, pending: loading, error } = await useAsyncData(
  () => `top-localities-${selectedType.value}`,
  () => getTopLocalities(selectedType.value),
  { watch: [selectedType], server: false },
)

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function destroyChart() {
  chartInstance?.destroy()
  chartInstance = null
}

function buildChartData(localities: LocalityStats[]) {
  return {
    labels: localities.map(item => formatLabel(item.name)),
    datasets: CATEGORY_META.map(category => ({
      label: category.label,
      data: localities.map(item => item[category.key]),
      backgroundColor: category.color,
      borderRadius: 6,
      borderSkipped: false,
      barThickness: 18,
    })),
  }
}

function renderChart(localities: LocalityStats[]) {
  if (!chartCanvas.value || !localities.length) return

  destroyChart()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: buildChartData(localities) as Chart['data'],
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { top: 8, right: 16, bottom: 8, left: 8 },
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, boxHeight: 12, padding: 16 },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          grid: { display: false },
          border: { display: false },
          ticks: { precision: 0 },
        },
        y: {
          stacked: true,
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#374151',
            font: { size: 13, weight: 'bold' },
            padding: 10,
          },
        },
      },
    } as Chart['options'],
  })
}

async function tryRenderChart() {
  if (loading.value || error.value || !topLocalities.value?.length) {
    destroyChart()
    return
  }
  await nextTick()
  renderChart(topLocalities.value)
}

watch([topLocalities, loading, error], tryRenderChart, { immediate: true })

onMounted(() => {
  tryRenderChart()
})

onBeforeUnmount(() => {
  destroyChart()
})
</script>

<template>
  <section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-600 dark:bg-gray-800">
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold">Top localités</h2>
        <p class="text-sm text-gray-400">
          Top 5 des localités par nombre total d'entités disponibles.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="type in locationTypes"
          :key="type.id"
          type="button"
          class="rounded-full px-4 py-2 text-sm font-medium transition"
          :class="selectedType === type.id
            ? 'bg-(--color-primary) text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'"
          @click="selectedType = type.id"
        >
          {{ type.label }}
        </button>
      </div>
    </div>

    <p v-if="error" class="text-sm text-red-600">Erreur : {{ error.message }}</p>

    <p
      v-else-if="!loading && !topLocalities?.length"
      class="rounded-xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400 dark:border-gray-600"
    >
      Aucune donnée disponible pour ce type de localité.
    </p>

    <!-- Canvas toujours monté : Chart.js a besoin du DOM au moment de l'init -->
    <div v-else class="relative h-96">
      <div
        v-if="loading"
        class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-sm text-gray-400 dark:bg-gray-800/80"
      >
        Chargement…
      </div>
      <canvas ref="chartCanvas" class="size-full" />
    </div>

    <ul v-if="topLocalities?.length && !loading" class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <li
        v-for="(locality, index) in topLocalities"
        :key="locality.name"
        class="rounded-xl bg-gray-50 p-4 dark:bg-gray-900"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">
          #{{ index + 1 }}
        </p>
        <p class="font-semibold capitalize">{{ formatLabel(locality.name) }}</p>
        <p class="mt-1 text-sm text-gray-500">{{ locality.total }} entités</p>
      </li>
    </ul>
  </section>
</template>
