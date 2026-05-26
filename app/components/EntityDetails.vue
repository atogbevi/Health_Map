<script setup lang="ts">
const route = useRoute()
const { fetchEntityById } = useEntity()

const entityId = computed(() => Number(route.params.id))

const { data: entity, pending: loading, error } = await useAsyncData(
  () => `entity-${entityId.value}`,
  async () => {
    if (!entityId.value || Number.isNaN(entityId.value)) return null
    return fetchEntityById(entityId.value)
  },
  { watch: [entityId] },
)

function formatOpeningHours(jours: string[] | undefined) {
  if (!jours?.length) return 'Non renseigné'
  if (jours.length === 1) return jours[0]
  return `${jours[0]} – ${jours.at(-1)}`
}

const categoryIcon: Record<string, string> = {
  pharmacie: 'mdi:pharmacy',
  hopital: 'mdi:hospital-building',
  clinique: 'mdi:hospital-building',
  institution: 'mdi:office-building',
  startup: 'mdi:robot',
}
</script>

<template>
  <section class="page-section">
    <div class="page-container">
      <NuxtLink
        to="/entity"
        class="btn btn-ghost -ml-2 mb-6 inline-flex text-(--color-primary)"
      >
        <Icon name="mdi:arrow-left" class="size-4" />
        Retour à l'annuaire
      </NuxtLink>

      <div v-if="loading" class="flex flex-col gap-6">
        <div class="card p-8">
          <div class="skeleton mb-3 h-4 w-24" />
          <div class="skeleton mb-4 h-10 w-2/3" />
          <div class="skeleton h-20 w-full" />
        </div>
      </div>

      <div
        v-else-if="error"
        class="empty-state border-(--color-danger)/30 bg-(--color-danger-muted)"
      >
        <span class="empty-state-icon bg-(--color-danger-muted) text-(--color-danger)">
          <Icon name="mdi:alert-circle-outline" class="size-5" />
        </span>
        <p class="font-medium text-(--color-text)">Erreur de chargement</p>
        <p class="text-sm text-(--color-text-secondary)">{{ error.message }}</p>
      </div>

      <div v-else-if="entity" class="flex flex-col gap-8 animate-fade-in-up">
        <article class="card overflow-hidden">
          <div class="border-b border-(--color-border) bg-(--color-surface-muted) px-6 py-8 lg:px-8">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="flex gap-4">
                <span class="flex size-12 shrink-0 items-center justify-center rounded-card bg-(--color-primary-muted) text-(--color-primary)">
                  <Icon :name="categoryIcon[entity.categorie?.toLowerCase() ?? ''] ?? 'mdi:domain'" class="size-6" />
                </span>
                <div>
                  <p class="label-overline capitalize">{{ entity.categorie }}</p>
                  <h1 class="mt-1 text-3xl font-bold tracking-tight text-(--color-text) md:text-4xl">
                    {{ entity.nom }}
                  </h1>
                </div>
              </div>
            </div>
            <p
              v-if="entity.description"
              class="mt-5 max-w-3xl text-base leading-relaxed text-(--color-text-secondary) md:text-lg"
            >
              {{ entity.description }}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-px bg-(--color-border) sm:grid-cols-2 xl:grid-cols-4">
            <div class="bg-(--color-surface) p-5 lg:p-6">
              <p class="label-overline">Canton</p>
              <p class="mt-2 font-semibold capitalize text-(--color-text)">{{ entity.canton || '—' }}</p>
            </div>
            <div class="bg-(--color-surface) p-5 lg:p-6">
              <p class="label-overline">Commune</p>
              <p class="mt-2 font-semibold capitalize text-(--color-text)">{{ entity.commune || '—' }}</p>
            </div>
            <div class="bg-(--color-surface) p-5 lg:p-6">
              <p class="label-overline">Préfecture</p>
              <p class="mt-2 font-semibold capitalize text-(--color-text)">{{ entity.prefecture || '—' }}</p>
            </div>
            <div class="bg-(--color-surface) p-5 lg:p-6">
              <p class="label-overline">Horaires</p>
              <p class="mt-2 font-semibold text-(--color-text)">{{ formatOpeningHours(entity.jours_ouverture) }}</p>
            </div>
          </div>
        </article>

        <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article
            v-if="entity.services?.length"
            class="card p-6 lg:col-span-2 lg:p-8"
          >
            <h2 class="mb-5 text-lg font-semibold tracking-tight text-(--color-text)">
              Services proposés
            </h2>
            <ul class="space-y-3">
              <li
                v-for="service in entity.services"
                :key="service"
                class="flex items-start gap-3 text-sm text-(--color-text-secondary)"
              >
                <Icon name="mdi:check-circle" class="mt-0.5 shrink-0 text-(--color-success)" />
                <span>{{ service }}</span>
              </li>
            </ul>
          </article>

          <aside class="flex flex-col gap-6">
            <article
              v-if="entity.autres_infos?.length"
              class="card p-6"
            >
              <h2 class="mb-4 text-lg font-semibold tracking-tight text-(--color-text)">
                Infos pratiques
              </h2>
              <ul class="space-y-3">
                <li
                  v-for="info in entity.autres_infos"
                  :key="info"
                  class="flex items-start gap-3 text-sm text-(--color-text-secondary)"
                >
                  <Icon name="mdi:information-outline" class="mt-0.5 shrink-0 text-(--color-primary)" />
                  <span>{{ info }}</span>
                </li>
              </ul>
            </article>

            <article
              v-if="entity.latitude && entity.longitude"
              class="card p-6"
            >
              <h2 class="mb-4 text-lg font-semibold tracking-tight text-(--color-text)">
                Coordonnées
              </h2>
              <div class="surface-inset flex items-center gap-3 px-4 py-3">
                <Icon name="mdi:crosshairs-gps" class="size-5 text-(--color-primary)" />
                <p class="font-mono text-sm text-(--color-text-secondary)">
                  {{ entity.latitude }}, {{ entity.longitude }}
                </p>
              </div>
            </article>
          </aside>
        </div>
      </div>

      <article
        v-else
        class="empty-state card max-w-lg mx-auto p-10"
      >
        <span class="empty-state-icon">
          <Icon name="mdi:map-marker-off-outline" class="size-5" />
        </span>
        <h1 class="text-xl font-semibold text-(--color-text)">Entité introuvable</h1>
        <p class="text-sm text-(--color-text-secondary)">
          L'identifiant demandé ne correspond à aucune structure de l'annuaire.
        </p>
        <NuxtLink to="/entity" class="btn btn-primary mt-2">
          Revenir à la liste
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
