<template>
  <div class="relative min-h-screen bg-(--color-background) text-(--color-text) transition-colors duration-300">
    <div
      class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl dark:opacity-25"
        style="background: radial-gradient(circle, var(--color-primary-muted) 0%, transparent 70%)"
      />
      <div
        class="absolute bottom-0 left-0 h-80 w-80 rounded-full opacity-30 blur-3xl dark:opacity-15"
        style="background: radial-gradient(circle, var(--color-surface-muted) 0%, transparent 70%)"
      />
    </div>

    <Header />
    <main class="pb-16">
      <slot />
    </main>
  </div>
</template>
