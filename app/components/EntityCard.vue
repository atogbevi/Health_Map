<script setup lang="ts">
    const props = defineProps({
        id: Number,
        category: String,
        name: String,
        description: String,
        location: String,
        hour: String,
    })
</script>

<template>
    <div class="flex flex-col bg-white dark:bg-gray-800 rounded-lg px-4 py-6 border border-gray-200 dark:border-gray-600 hover:scale-105 transition ease-in-out duration-500 ">
        <div class="flex justify-between">
            <Icon name="mdi:heart-pulse" class="text-(--color-primary) size-6"/>
            <div class="flex px-4 py-1 bg-green-100 rounded-lg">
                <p class="text-sm text-green-800">{{ props.hour }}</p>
            </div>
        </div>

        <div class="flex flex-col gap-2 mt-4">
            <p class="text-sm text-gray-300" >{{ props.category }}</p> 
            <p class="text-xl font-bold">{{ props.name }}</p>
            <p class="text-sm text-gray-300">
                <Icon name="mdi:map-marker" /> 
                {{ props.location }}
            </p>
        </div>
        <NuxtLink :to="`/entity/${props.id}`" class="text-primary font-bold text-sm mt-4 text-left">
            Details
        </NuxtLink>
    </div>

</template>