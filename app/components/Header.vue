<script setup>
  const navLinks = [
    { href: '/', text: 'Accueil' },
    { href: '/entity', text: 'Entités' },
    { href: '/dashboard', text: 'Tableau de bord' },
  ]
</script>

<template>
  <div class="transition-colors duration-300">
    <header class="px-4 flex justify-between items-center">
        <div class="flex w-full justify-between items-center px-6 py-4 ">
            <NuxtLink href="/">
                <h1 class="text-3xl font-bold text-blue-500">HealthMap</h1>
            </NuxtLink>
            <nav>
              <ul class="flex gap-4">
                <li v-for="link in navLinks" :key="link.href" class="hover:text-(--color-primary)">
                  <NuxtLink :href="link.href">
                    {{ link.text }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
            <UColorModeSwitch class="text-3xl cursor-pointer hover:text-cyan-700 dark:hover:text-yellow-400" />
        </div>
    </header>
  </div>
</template>