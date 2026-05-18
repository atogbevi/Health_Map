<script setup lang="ts">
    
    const props = defineProps({
        id: Number,
        categorie: String,
        nom: String,
        canton: String,
        description: String,
        jours_ouverture: Array<string>,
    })
</script>

<template>
    <div class="flex flex-col bg-white dark:bg-gray-800 rounded-lg px-4 py-6 border border-gray-200 dark:border-gray-600 hover:scale-105 transition ease-in-out duration-500 ">
        <div class="flex justify-between">
            <Icon v-if="props.categorie === 'pharmacie'" name="mdi:pharmacy" class="text-(--color-primary) size-6"/>
            <Icon v-if="props.categorie === 'hopital' || props.categorie === 'clinique'" name="mdi:hospital-building" class="text-green-600 size-6"/>
            <Icon v-if="props.categorie === 'institution'" name="mdi:office-building" class="text-purple-600 size-6"/>
            <Icon v-if="props.categorie === 'startup'" name="mdi:robot" class="text-orange-600 size-6"/>

            <div v-if="props.jours_ouverture?.length" class="flex px-4 py-1 bg-green-100 rounded-lg">
                <p class="text-sm text-green-800">{{ props.jours_ouverture?.[0] }} - {{ props.jours_ouverture?.at(-1) }}</p>
            </div>
        </div>

        <div class="flex flex-col gap-2 mt-4 text-gray-500 dark:text-gray-300 ">
            <p class=" capitalize" >{{ props.categorie }}</p> 
            <p class="text-xl font-bold text-(--color-text) ">{{ props.nom }}</p>
            <div class="flex items-center gap-2">
                <Icon name="mdi:map-marker" class="size-6 flex items-center"/> 
                <span class="capitalize">{{ props.canton }}</span>
            </div>
        </div>
        <NuxtLink :to="`/entity/${props.id}`" class="font-bold text-sm mt-4 text-left hover:text-(--color-primary)">
            Details
        </NuxtLink>
    </div>

</template>