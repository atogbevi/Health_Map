<script setup lang="ts">
const route = useRoute()

type EntityDetails = {
    id: number
    name: string
    category: string
    description: string
    location: string
    district: string
    phone: string
    email: string
    website: string
    openingHours: string
    emergency: boolean
    services: string[]
    practicalInfo: string[]
}

const entities: EntityDetails[] = [
    {
        id: 1,
        name: 'Pharmacie Centrale',
        category: 'Pharmacies',
        description: 'Pharmacie de proximité offrant la dispensation de médicaments, des conseils pharmaceutiques et un accompagnement personnalisé pour les traitements chroniques.',
        location: 'Centre-ville, Tunis',
        district: 'Tunis Centre',
        phone: '+216 71 000 101',
        email: 'contact@pharmaciecentrale.tn',
        website: 'www.pharmaciecentrale.tn',
        openingHours: '08:00 - 20:00',
        emergency: true,
        services: [
            'Dispensation de médicaments sur ordonnance',
            'Vente de produits de parapharmacie',
            'Conseils de prévention et suivi thérapeutique',
            'Prise de tension artérielle'
        ],
        practicalInfo: [
            'Accès PMR disponible',
            'Paiement mobile accepté',
            'Parking public à 100m'
        ]
    },
    {
        id: 2,
        name: 'Centre de Santé El Manar',
        category: 'Centres de santé',
        description: 'Structure sanitaire locale offrant des consultations générales, des soins préventifs et des services de vaccination pour les familles.',
        location: 'El Manar, Tunis',
        district: 'El Manar',
        phone: '+216 71 000 202',
        email: 'accueil@cselmanar.tn',
        website: 'www.cselmanar.tn',
        openingHours: '07:00 - 19:00',
        emergency: false,
        services: [
            'Consultations médecine générale',
            'Vaccination enfants et adultes',
            'Suivi prénatal et postnatal',
            'Sensibilisation en santé communautaire'
        ],
        practicalInfo: [
            'Laboratoire d’analyses partenaire à proximité',
            'Prise de rendez-vous téléphonique',
            'Accueil francophone et arabophone'
        ]
    },
    {
        id: 3,
        name: 'Ministère de la Santé',
        category: 'Institutions',
        description: 'Institution publique de référence qui pilote les politiques de santé, la régulation sanitaire et la coordination des programmes nationaux.',
        location: 'Avenue Mohamed V, Tunis',
        district: 'Zone administrative',
        phone: '+216 71 000 303',
        email: 'info@sante.gov.tn',
        website: 'www.sante.gov.tn',
        openingHours: '09:00 - 17:00',
        emergency: false,
        services: [
            'Information réglementaire et administrative',
            'Coordination des programmes nationaux de santé',
            'Orientation vers les structures sanitaires compétentes',
            'Publication de rapports et indicateurs publics'
        ],
        practicalInfo: [
            'Bureaux ouverts en semaine',
            'Accueil des partenaires institutionnels',
            'Documents publics disponibles en ligne'
        ]
    },
    {
        id: 4,
        name: 'MediTech Solutions',
        category: 'Health Tech',
        description: 'Startup de santé numérique spécialisée dans les solutions de suivi patient, télésanté et outils de coordination entre professionnels.',
        location: 'Technopole El Ghazala, Tunis',
        district: 'El Ghazala',
        phone: '+216 71 000 404',
        email: 'hello@meditech.tn',
        website: 'www.meditech.tn',
        openingHours: '09:00 - 18:00',
        emergency: false,
        services: [
            'Plateforme de suivi médical à distance',
            'Tableaux de bord pour professionnels de santé',
            'Intégration de solutions de téléconsultation',
            'Assistance technique et formation'
        ],
        practicalInfo: [
            'Démonstrations sur rendez-vous',
            'Accompagnement à la transformation digitale',
            'Support en ligne dédié'
        ]
    }
]

const entityId = computed(() => Number(route.params.id))
const entity = computed(() => entities.find((item) => item.id === entityId.value))
</script>

<template>
    <section class="px-6 py-12 lg:px-12">
        <NuxtLink to="/entity" class="inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary) mb-8">
            <Icon name="mdi:arrow-left" />
            Retour à l'annuaire
        </NuxtLink>

        <div
            v-if="entity"
            class="flex flex-col gap-8"
        >
            <article class="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 lg:p-8">
                <p class="text-sm text-gray-400">{{ entity.category }}</p>
                <h1 class="text-3xl md:text-4xl font-bold">{{ entity.name }}</h1>
                <p class="text-base md:text-lg text-gray-500">{{ entity.description }}</p>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                    <div class="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
                        <p class="text-xs text-gray-400 uppercase">Localisation</p>
                        <p class="font-semibold mt-2">{{ entity.location }}</p>
                    </div>
                    <div class="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
                        <p class="text-xs text-gray-400 uppercase">Quartier</p>
                        <p class="font-semibold mt-2">{{ entity.district }}</p>
                    </div>
                    <div class="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
                        <p class="text-xs text-gray-400 uppercase">Horaires</p>
                        <p class="font-semibold mt-2">{{ entity.openingHours }}</p>
                    </div>
                    <div class="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
                        <p class="text-xs text-gray-400 uppercase">Urgence</p>
                        <p class="font-semibold mt-2">
                            {{ entity.emergency ? 'Service d’urgence disponible' : 'Pas de service d’urgence' }}
                        </p>
                    </div>
                </div>
            </article>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <article class="xl:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 lg:p-8">
                    <h2 class="text-2xl font-bold mb-4">Services proposés</h2>
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
                    <article class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                        <h2 class="text-xl font-bold mb-4">Contacts</h2>
                        <div class="flex flex-col gap-3 text-sm">
                            <p><span class="font-semibold">Téléphone:</span> {{ entity.phone }}</p>
                            <p><span class="font-semibold">Email:</span> {{ entity.email }}</p>
                            <p><span class="font-semibold">Site web:</span> {{ entity.website }}</p>
                        </div>
                    </article>

                    <article class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                        <h2 class="text-xl font-bold mb-4">Infos pratiques</h2>
                        <ul class="space-y-2">
                            <li
                                v-for="info in entity.practicalInfo"
                                :key="info"
                                class="flex items-start gap-3"
                            >
                                <Icon name="mdi:information-outline" class="mt-0.5 text-(--color-primary)" />
                                <span>{{ info }}</span>
                            </li>
                        </ul>
                    </article>
                </aside>
            </div>
        </div>

        <article
            v-else
            class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center"
        >
            <h1 class="text-2xl font-bold mb-3">Entité introuvable</h1>
            <p class="text-gray-500 mb-6">L’identifiant demandé ne correspond à aucune structure de l’annuaire.</p>
            <NuxtLink to="/entity" class="inline-flex bg-(--color-primary) text-white px-5 py-3 rounded-lg">
                Revenir à la liste des entités
            </NuxtLink>
        </article>
    </section>
</template>