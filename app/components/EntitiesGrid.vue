<script setup lang="ts">

    const entities = [
        {
            id: 1,
            category: 'Pharmacies',
            name: 'Pharmacie Centrale',
            description: 'Pharmacie située au centre-ville offrant une large gamme de médicaments et de produits de santé.',
            location: 'Centre-ville, Tunis',
            hour: '8h - 20h'
        },
        {
            id: 2,
            category: 'Centres de santé',
            name: 'Centre de Santé El Manar',
            description: 'Centre de santé moderne avec des services de consultation, de vaccination et de soins d’urgence.',
            location: 'El Manar, Tunis',
            hour: '7h - 19h'
        },
        {
            id: 3,
            category: 'Institutions',
            name: 'Ministère de la Santé',
            description: 'Institution gouvernementale responsable de la politique de santé publique et de la gestion des ressources sanitaires.',
            location: 'Avenue Mohamed V, Tunis',
            hour: '9h - 17h'
        },
        {
            id: 4,
            category: 'Health Tech',
            name: 'MediTech Solutions',
            description: 'Startup innovante développant des applications mobiles pour la gestion de la santé personnelle et le suivi médical.',
            location: 'Technopole El Ghazala, Tunis',
            hour: '9h - 18h'
        },
    ]
</script>

<template>
    <section class="flex flex-col py-12 px-6 lg:px-12">

        <div class="flex flex-col gap-2 mb-28">
            <h2 class="text-2xl font-bold">Annuaire de recherche</h2>
            <p class="text-lg text-gray-400">Filtrez et trouvez des prestataires spécifiques dans notre réseau.</p>
        </div>

        <div class="flex flex-col lg:flex-row justify-between">
            <Filters />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-3">
                <EntityCard
                    v-for="entity in entities"
                    :key="entity.id"
                    :id="entity.id"
                    :name="entity.name"
                    :category="entity.category"
                    :description="entity.description"
                    :location="entity.location"
                    :hour="entity.hour"

                />
            </div>
        </div>

    </section>
</template>