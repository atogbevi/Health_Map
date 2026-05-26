<script setup>
    import { getStats } from '~/composables/getStats'

    const stats = await getStats()

    const entitiesCount = [
        {
            id: 1,
            name: 'Total',
            count: stats.total,
            icon: 'mdi-database',
            color: '#6b7280',
            description: 'entités enregistrées'
        },
        {
            id: 2,
            name: 'Pharmacies',
            count: stats.pharmacies,
            icon: 'mdi-pharmacy',
            color: '#155dfc',
            description: 'pharmacies'
        },
        {
            id: 3,
            name: 'Centres de santé',
            count: stats.centres_de_sante,
            icon: 'mdi-hospital-building',
            color: '#016630',
            description: 'centres de santé'
        },
        {
            id: 4,
            name: 'Institutions',
            count: stats.institutions,
            icon: 'mdi-building',
            color: '#9810fa',
            description: 'institutions publiques'
        },
        {
            id: 5,
            name: 'Health Tech',
            count: stats.health_tech,
            icon: 'mdi-robot',
            color: '#ff6900',
            description: 'startups'
        },
    ]

    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
</script>

<template>
    <section class="flex flex-wrap gap-10 px-6 lg:px-12">
        <div 
            v-for="entity in entitiesCount " :key="entity.id" 
            class ="flex-1 flex-col p-7 rounded-xl shadow-xs bg-white dark:bg-gray-800 hover:scale-105 transition ease-in-out duration-500">

            <div class="h-10 w-10 rounded-xl flex items-center justify-center mb-5"
                :style="{'background-color': hexToRgba(entity.color, 0.1)}">
                <Icon :name="entity.icon"
                    :style="{'color': entity.color, 'opacity': 1}"
                />
            </div>
            <div class="flex flex-col gap-1">
                <p class="font-bold">{{ entity.name }}
                    
                </p>
                <p>{{ entity.count }} {{ entity.description }}</p>
            </div>
        </div>
    </section>
</template>