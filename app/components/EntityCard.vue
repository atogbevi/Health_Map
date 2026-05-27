<script setup lang="ts">
const props = defineProps({
  id: Number,
  categorie: String,
  nom: String,
  canton: String,
  description: String,
  jours_ouverture: Array<string>,
})

const categoryIcon: Record<string, { icon: string, accent: string }> = {
  pharmacie: { icon: 'mdi:pharmacy', accent: 'text-(--color-primary)' },
  hopital: { icon: 'mdi:hospital-building', accent: 'text-emerald-600 dark:text-emerald-400' },
  clinique: { icon: 'mdi:hospital-building', accent: 'text-emerald-600 dark:text-emerald-400' },
  institution: { icon: 'mdi:office-building', accent: 'text-violet-600 dark:text-violet-400' },
  startup: { icon: 'mdi:robot', accent: 'text-amber-600 dark:text-amber-400' },
  laboratoire: { icon: 'mdi:flask', accent: 'text-yellow-600 dark:text-yellow-500' },
}

const iconMeta = computed(() => {
  const key = props.categorie?.toLowerCase() ?? ''
  return categoryIcon[key] ?? { icon: 'mdi:domain', accent: 'text-(--color-text-muted)' }
})
</script>

<template>
  <article class="card card-interactive group flex h-full flex-col p-5">
    <div class="flex items-start justify-between gap-3">
      <span
        class="flex size-10 shrink-0 items-center justify-center rounded-control bg-(--color-surface-muted)"
        :class="iconMeta.accent"
      >
        <Icon :name="iconMeta.icon" class="size-5" />
      </span>

      <span
        v-if="props.jours_ouverture?.length"
        class="chip shrink-0 bg-(--color-success-muted) text-[0.6875rem] font-medium text-(--color-success)"
      >
        {{ props.jours_ouverture[0] }} – {{ props.jours_ouverture.at(-1) }}
      </span>
    </div>

    <div class="mt-4 flex flex-1 flex-col gap-2">
      <p class="label-overline capitalize">{{ props.categorie }}</p>
      <h3 class="text-lg font-semibold leading-snug tracking-tight text-(--color-text)">
        {{ props.nom }}
      </h3>
      <p
        v-if="props.description"
        class="line-clamp-2 text-sm text-(--color-text-secondary)"
      >
        {{ props.description }}
      </p>
      <div v-if="props.canton" class="mt-1 flex items-center gap-1.5 text-sm text-(--color-text-muted)">
        <Icon name="mdi:map-marker-outline" class="size-4 shrink-0" />
        <span class="capitalize">{{ props.canton }}</span>
      </div>
    </div>

    <NuxtLink
      :to="`/entity/${props.id}`"
      class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-(--color-primary) transition group-hover:gap-2"
    >
      Voir les détails
      <Icon name="mdi:arrow-right" class="size-4 transition-transform group-hover:translate-x-0.5" />
    </NuxtLink>
  </article>
</template>
