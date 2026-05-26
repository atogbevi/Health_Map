<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)
const colorMode = useColorMode()

const navLinks = [
  { href: '/', text: 'Accueil' },
  { href: '/entity', text: 'Entités' },
  { href: '/dashboard', text: 'Tableau de bord' },
]

function isActive(href: string) {
  if (href === '/') return route.path === '/'
  return route.path === href || route.path.startsWith(`${href}/`)
}

watch(() => route.path, () => {
  mobileOpen.value = false
})

const isDarkMode = computed(() => colorMode.value === 'dark')

function toggleColorMode() {
  colorMode.preference = isDarkMode.value ? 'light' : 'dark'
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-surface)/80 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300"
    style="height: var(--header-height)"
  >
    <div class="page-container flex h-full items-center justify-between gap-4">
      <NuxtLink
        href="/"
        class="group flex shrink-0 items-center gap-2.5"
      >
        <span
          class="flex size-8 items-center justify-center rounded-control bg-(--color-primary) text-sm font-bold text-white shadow-sm"
        >
          H
        </span>
        <span class="text-lg font-bold tracking-tight text-(--color-text) transition-colors group-hover:text-(--color-primary)">
          HealthMap
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-0.5 md:flex" aria-label="Navigation principale">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link"
          :class="{ 'nav-link-active': isActive(link.href) }"
        >
          {{ link.text }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn btn-ghost rounded-control p-2 text-(--color-text-secondary) hover:text-(--color-text)"
          :aria-label="isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'"
          @click="toggleColorMode"
        >
          <Icon
            :name="isDarkMode ? 'mdi:white-balance-sunny' : 'mdi:moon-waning-crescent'"
            :class="isDarkMode ? 'text-yellow-400' : 'text-cyan-700'"
            class="size-5"
          />
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-control p-2 md:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :name="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="size-5" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <nav
        v-show="mobileOpen"
        id="mobile-nav"
        class="border-t border-(--color-border) bg-(--color-surface) px-4 py-3 md:hidden"
        aria-label="Navigation mobile"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="link in navLinks" :key="link.href">
            <NuxtLink
              :href="link.href"
              class="nav-link block w-full"
              :class="{ 'nav-link-active': isActive(link.href) }"
            >
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
