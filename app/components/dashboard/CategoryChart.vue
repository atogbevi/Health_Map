<script setup lang="ts">
import { getStats } from '~/composables/getStats'
import { Chart } from 'chart.js/auto'

    const chartCanvas = ref<HTMLCanvasElement | null>(null)
    let chartInstance: Chart | null = null
    const stats = await getStats()

    const data = {
        labels: ['Pharmacie', 'Hôpital', 'Clinique', 'Institution', 'Startup'],
        datasets: [{
            label: 'Nombre d’entités',
            data: [
                stats.pharmacies,
                stats.centres_de_sante,
                stats.institutions,
                stats.health_tech,
            ],
            backgroundColor: ['#155dfc', '#016630', '#9810fa', '#ff6900', '#eab308'],
            borderRadius: 10,
            height: 1,
            barThickness: 18,
            
        },],
    }

    onMounted(() => {
    if (!chartCanvas.value) return

    chartInstance = new Chart(chartCanvas.value, {
        type: 'bar',
        data,
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
                ticks: { color: '#374151', font: { size: 13, weight: 'bold' }, padding: 10 },
            },
        },
        },
        
    })
    })

    onBeforeUnmount(() => {
    chartInstance?.destroy()
    })
</script>

<template>
  <section class="px-6 lg:px-12">
    <h2 class="text-2xl font-bold">Distribution des structures par catégorie</h2>
    <div class="h-80">
      <canvas ref="chartCanvas" />
    </div>
  </section>
</template>
