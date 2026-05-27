<script setup lang="ts">
import { getTopLocalities } from '~/composables/getStats'
import type { LocalityStats, LocalityType } from '~~/shared/types/Stats'
import { KNOWN_CATEGORIES } from '~/composables/useEntityFilters'
import { Chart } from 'chart.js/auto'

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null
const { tickColor, legendColor } = useChartTheme()

const locationTypes: { id: LocalityType, label: string }[] = [
  { id: 'commune', label: 'Communes' },
  { id: 'canton', label: 'Cantons' },
  { id: 'prefecture', label: 'Préfectures' },
]

const CATEGORY_META = [
  { key: 'pharmacie' as const, label: 'Pharmacie', color: '#2563eb' },
  { key: 'laboratoire' as const, label: 'Laboratoire', color: '#f0b100' },
  { key: 'hopital' as const, label: 'Hôpital', color: '#059669' },
  { key: 'clinique' as const, label: 'Clinique', color: '#10b981' },
  { key: 'institution' as const, label: 'Institution', color: '#7c3aed' },
  { key: 'startup' as const, label: 'Startup', color: '#ea580c' },
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

function buildOptions() {
  return {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 8, right: 16, bottom: 8, left: 8 },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 20,
          color: legendColor.value,
          font: { size: 12, family: 'Plus Jakarta Sans' },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        titleFont: { family: 'Plus Jakarta Sans', size: 13 },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        grid: { display: false },
        border: { display: false },
        ticks: {
          precision: 0,
          color: tickColor.value,
          font: { size: 11, family: 'Plus Jakarta Sans' },
        },
      },
      y: {
        stacked: true,
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: tickColor.value,
          font: { size: 12, weight: 'bold' as const, family: 'Plus Jakarta Sans' },
          padding: 10,
        },
      },
    },
  }
}

function renderChart(localities: LocalityStats[]) {
  if (!chartCanvas.value || !localities.length) return

  destroyChart()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: buildChartData(localities) as Chart['data'],
    options: buildOptions() as Chart['options'],
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
watch([tickColor, legendColor], tryRenderChart)

onMounted(() => {
  tryRenderChart()
})

onBeforeUnmount(() => {
  destroyChart()
})
</script>

<template>
  <section class="chart-card">
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 class="text-lg font-semibold tracking-tight text-(--color-text)">
          Top localités
        </h2>
        <p class="mt-1 text-sm text-(--color-text-secondary)">
          Top 5 des localités par nombre total d'entités disponibles.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="type in locationTypes"
          :key="type.id"
          type="button"
          class="chip"
          :class="selectedType === type.id ? 'chip-active' : 'chip-default'"
          @click="selectedType = type.id"
        >
          {{ type.label }}
        </button>
      </div>
    </div>

    <p v-if="error" class="text-sm text-(--color-danger)">
      Erreur : {{ error.message }}
    </p>

    <div
      v-else-if="!loading && !topLocalities?.length"
      class="empty-state py-14"
    >
      <span class="empty-state-icon">
        <Icon name="mdi:chart-box-outline" class="size-5" />
      </span>
      <p class="text-sm font-medium text-(--color-text)">Aucune donnée disponible</p>
      <p class="text-xs text-(--color-text-muted)">
        Essayez un autre type de localité.
      </p>
    </div>

    <div v-else class="relative h-96">
      <div
        v-if="loading"
        class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-control bg-(--color-surface)/90 backdrop-blur-sm"
      >
        <div class="skeleton size-8 rounded-full" />
        <p class="text-sm text-(--color-text-muted)">Chargement des données…</p>
      </div>
      <canvas ref="chartCanvas" class="size-full" />
    </div>

    <ul
      v-if="topLocalities?.length && !loading"
      class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
    >
      <li
        v-for="(locality, index) in topLocalities"
        :key="locality.name"
        class="card-muted p-4 transition hover:border-(--color-border-strong)"
      >
        <p class="label-overline">#{{ index + 1 }}</p>
        <p class="mt-1 font-semibold capitalize text-(--color-text)">
          {{ formatLabel(locality.name) }}
        </p>
        <p class="mt-1 text-sm text-(--color-text-muted)">
          {{ locality.total }} entités
        </p>
      </li>
    </ul>
  </section>
</template>
