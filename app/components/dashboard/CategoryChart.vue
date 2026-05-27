<script setup lang="ts">
import { getStats } from '~/composables/getStats'
import { Chart } from 'chart.js/auto'

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null
const stats = await getStats()
const { tickColor, legendColor } = useChartTheme()

const CHART_COLORS = ['#2563eb', '#f0b100', '#059669', '#7c3aed', '#ea580c', '#ca8a04']

const data = {
  labels: ['Pharmacie', 'Laboratoire', 'Hôpital', 'Clinique', 'Institution', 'Startup'],
  datasets: [{
    label: "Nombre d'entités",
    data: [
      stats.pharmacies,
      stats.laboratoires,
      stats.hopitaux,
      stats.cliniques,
      stats.institutions,
      stats.health_tech,
      stats.laboratoires,
    ],
    backgroundColor: CHART_COLORS,
    borderRadius: 8,
    barThickness: 20,
  }],
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

function renderChart() {
  if (!chartCanvas.value) return
  chartInstance?.destroy()
  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data,
    options: buildOptions() as Chart['options'],
  })
}

onMounted(() => {
  renderChart()
})

watch([tickColor, legendColor], () => {
  if (chartInstance) {
    chartInstance.options = buildOptions() as Chart['options']
    chartInstance.update()
  }
})

onBeforeUnmount(() => {
  chartInstance?.destroy()
})
</script>

<template>
  <section class="chart-card">
    <header class="mb-6">
      <h2 class="text-lg font-semibold tracking-tight text-(--color-text)">
        Distribution par catégorie
      </h2>
      <p class="mt-1 text-sm text-(--color-text-secondary)">
        Répartition des structures enregistrées par type.
      </p>
    </header>
    <div class="h-96">
      <canvas ref="chartCanvas" />
    </div>
  </section>
</template>
