<script setup>

    import { createClient } from '@supabase/supabase-js'
    const config = useRuntimeConfig()
    const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    )

    const stats = {
    pharmacies: 0,
    centres_de_sante: 0,
    institutions: 0,
    health_tech: 0
    }

    stats.pharmacies = (
    await supabase
        .from('entities')
        .select('*', { count: 'exact', head: true })
        .eq('categorie', 'pharmacie')
    ).count

    stats.centres_de_sante = (
        await supabase
        .from('entities')
        .select('*', { count: 'exact', head: true })
        .eq('categorie', 'clinique', 'hopital')
    ).count

    stats.institutions = (
        await supabase
        .from('entities')
        .select('*', { count: 'exact', head: true })
        .eq('categorie', 'institution')
    ).count
    
    stats.health_tech = (
        await supabase
        .from('entities')
        .select('*', { count: 'exact', head: true })
        .eq('categorie', 'startup')
    ).count


    const entitiesCount = [
        {
            id: 1,
            name: 'Pharmacies',
            count: stats.pharmacies,
            icon: 'mdi-pharmacy',
            color: '#155dfc',
            description: 'pharmacies'
        },
        {
            id: 2,
            name: 'Centres de santé',
            count: stats.centres_de_sante,
            icon: 'mdi-hospital-building',
            color: '#016630',
            description: 'centres de santé'
        },
        {
            id: 3,
            name: 'Institutions',
            count: stats.institutions,
            icon: 'mdi-building',
            color: '#9810fa',
            description: 'institutions publiques'
        },
        {
            id: 4,
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