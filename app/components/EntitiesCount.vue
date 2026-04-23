<script setup>
    const entitiesCount = [
        {
            id: 1,
            name: 'Pharmacies',
            count: 350,
            icon: 'mdi-pharmacy',
            color: '#155dfc',
            description: 'lieux'
        },
        {
            id: 2,
            name: 'Centres de santé',
            count: 200,
            icon: 'mdi-hospital-building',
            color: '#016630',
            description: 'lieux'
        },
        {
            id: 3,
            name: 'Institutions',
            count: 20,
            icon: 'mdi-building',
            color: '#9810fa',
            description: 'institutions publiques'
        },
        {
            id: 4,
            name: 'Health Tech',
            count: 40,
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
    <div class="flex flex-wrap gap-10 mx-auto py-12 px-6 lg:px-12">
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
    </div>
</template>