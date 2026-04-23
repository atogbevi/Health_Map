<template>
    <div class="flex flex-col h-screen w-full px-6 mx-auto items-center justify-center gap-10 lg:px-0 lg:w-1/2">
        <div class="flex flex-col gap-10 text-center">
            <h1 class="text-gray-900 dark:text-white text-3xl font-bold md:text-5xl">Mapping the future of healthcare access.</h1>
            <p class="text-gray-900 dark:text-white lg:text-xl">Our mission is to democratize healthcare visibility. HealthMap is your centralized directory to discover, compare, and connect with trusted providers and innovative health-tech startups in your area.</p>
        </div>
        <div class="flex gap-8">
            <NuxtLink href="/entity" class="text-white bg-blue-600 rounded-lg p-3 text-md cursor-pointer">Explore Entities</NuxtLink>
            <NuxtLink href="/dashboard" class=" text-white bg-blue-600 rounded-lg p-3 text-md cursor-pointer">Discover Analytics</NuxtLink>
        </div>
    </div>
</template>