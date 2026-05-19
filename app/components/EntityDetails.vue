<script setup lang="ts">
import type { Entity } from '~~/shared/types/Entity'

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
</script>

<template>
  <section class="px-6 py-12 lg:px-12">
    <NuxtLink
      to="/entity"
      class="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary)"
    >
      <Icon name="mdi:arrow-left" />
      Retour à l'annuaire
    </NuxtLink>

    <p v-if="loading" class="text-sm text-gray-400">Chargement…</p>

    <p v-else-if="error" class="text-sm text-red-600">
      Erreur : {{ error.message }}
    </p>

    <div v-else-if="entity" class="flex flex-col gap-8">
      <article class="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 lg:p-8">
        <p class="text-sm capitalize text-gray-400">{{ entity.categorie }}</p>
        <h1 class="text-3xl font-bold md:text-4xl">{{ entity.nom }}</h1>
        <p v-if="entity.description" class="text-base text-gray-500 md:text-lg">
          {{ entity.description }}
        </p>

        <div class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <p class="text-xs uppercase text-gray-400">Canton</p>
            <p class="mt-2 font-semibold capitalize">{{ entity.canton || '—' }}</p>
          </div>
          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <p class="text-xs uppercase text-gray-400">Commune</p>
            <p class="mt-2 font-semibold capitalize">{{ entity.commune || '—' }}</p>
          </div>
          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <p class="text-xs uppercase text-gray-400">Préfecture</p>
            <p class="mt-2 font-semibold capitalize">{{ entity.prefecture || '—' }}</p>
          </div>
          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <p class="text-xs uppercase text-gray-400">Horaires</p>
            <p class="mt-2 font-semibold">{{ formatOpeningHours(entity.jours_ouverture) }}</p>
          </div>
        </div>
      </article>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <article
          v-if="entity.services?.length"
          class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 lg:col-span-2 lg:p-8"
        >
          <h2 class="mb-4 text-2xl font-bold">Services proposés</h2>
          <ul class="space-y-3">
            <li
              v-for="service in entity.services"
              :key="service"
              class="flex items-start gap-3"
            >
              <Icon name="mdi:check-circle" class="mt-0.5 text-green-600" />
              <span>{{ service }}</span>
            </li>
          </ul>
        </article>

        <aside class="flex flex-col gap-6">
          <article
            v-if="entity.autres_infos?.length"
            class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
            :class="{ 'xl:col-span-1': entity.services?.length }"
          >
            <h2 class="mb-4 text-xl font-bold">Infos pratiques</h2>
            <ul class="space-y-2">
              <li
                v-for="info in entity.autres_infos"
                :key="info"
                class="flex items-start gap-3"
              >
                <Icon name="mdi:information-outline" class="mt-0.5 text-(--color-primary)" />
                <span>{{ info }}</span>
              </li>
            </ul>
          </article>

          <article
            v-if="entity.latitude && entity.longitude"
            class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 class="mb-4 text-xl font-bold">Coordonnées</h2>
            <p class="text-sm text-gray-500">
              {{ entity.latitude }}, {{ entity.longitude }}
            </p>
          </article>
        </aside>
      </div>
    </div>

    <article
      v-else
      class="rounded-xl border border-gray-200 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-800"
    >
      <h1 class="mb-3 text-2xl font-bold">Entité introuvable</h1>
      <p class="mb-6 text-gray-500">
        L'identifiant demandé ne correspond à aucune structure de l'annuaire.
      </p>
      <NuxtLink
        to="/entity"
        class="inline-flex rounded-lg bg-(--color-primary) px-5 py-3 text-white"
      >
        Revenir à la liste des entités
      </NuxtLink>
    </article>
  </section>
</template>
