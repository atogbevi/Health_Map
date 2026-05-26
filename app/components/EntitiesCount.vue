<script setup>
import { getStats } from '~/composables/getStats'

const stats = await getStats()

const entitiesCount = [
  {
    id: 1,
    name: 'Total',
    count: stats.total,
    icon: 'mdi:database-outline',
    color: '#64748b',
    description: 'entités enregistrées',
  },
  {
    id: 2,
    name: 'Pharmacies',
    count: stats.pharmacies,
    icon: 'mdi:pharmacy',
    color: '#2563eb',
    description: 'pharmacies',
  },
  {
    id: 3,
    name: 'Centres de santé',
    count: stats.centres_de_sante,
    icon: 'mdi:hospital-building',
    color: '#059669',
    description: 'centres de santé',
  },
  {
    id: 4,
    name: 'Institutions',
    count: stats.institutions,
    icon: 'mdi:office-building',
    color: '#7c3aed',
    description: 'institutions publiques',
  },
  {
    id: 5,
    name: 'Health Tech',
    count: stats.health_tech,
    icon: 'mdi:robot-outline',
    color: '#ea580c',
    description: 'startups',
  },
]

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
</script>

<template>
  <section class="page-container">
    <div class="flex flex-wrap gap-4">
      <div
        v-for="(entity, index) in entitiesCount"
        :key="entity.id"
        class="kpi-card animate-fade-in-up"
        :class="`stagger-${index + 1}`"
      >
        <div
          class="mb-4 flex size-10 items-center justify-center rounded-control"
          :style="{ backgroundColor: hexToRgba(entity.color, 0.12) }"
        >
          <Icon
            :name="entity.icon"
            class="size-5"
            :style="{ color: entity.color }"
          />
        </div>
        <p class="text-sm font-medium text-(--color-text-secondary)">
          {{ entity.name }}
        </p>
        <p class="mt-1 text-2xl font-bold tracking-tight text-(--color-text)">
          {{ entity.count }}
        </p>
        <p class="mt-0.5 text-xs text-(--color-text-muted)">
          {{ entity.description }}
        </p>
      </div>
    </div>
  </section>
</template>
