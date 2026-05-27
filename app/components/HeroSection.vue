<template>
  <section class="page-section flex min-h-[calc(100vh-var(--header-height))] items-center">
    <div class="page-container w-full">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center animate-fade-in-up">
        <!-- <div class="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-1.5 text-xs font-medium text-(--color-text-secondary) shadow-soft">
          <span class="size-1.5 rounded-full bg-(--color-primary)" />
          Annuaire santé & géospatial
        </div> -->

        <div class="flex flex-col gap-5">
          <h1 class="text-4xl font-bold leading-[1.1] tracking-tight text-(--color-text) md:text-5xl lg:text-[3.25rem]">
            Cartographier l'avenir de l'accès à la santé.
          </h1>
          <p class="text-base leading-relaxed text-(--color-text-secondary) md:text-lg">
            Notre mission est de démocratiser la visibilité de la santé. HealthMap est votre annuaire centralisé pour découvrir, comparer et connecter avec des prestataires de santé et des startups de technologie de santé dans votre région.
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <NuxtLink href="/entity" class="btn btn-primary px-6 py-3">
            <Icon name="mdi:magnify" class="size-4" />
            Explorer les entités
          </NuxtLink>
          <NuxtLink href="/dashboard" class="btn btn-secondary px-6 py-3">
            <Icon name="mdi:chart-bar" class="size-4" />
            Explorer les statistiques
          </NuxtLink>
        </div>

        <dl class="mt-4 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-(--color-border) pt-8">
          <div>
            <dt class="label-overline">Couverture</dt>
            <dd class="mt-1 text-lg font-semibold text-(--color-text)">Multi-régions</dd>
          </div>
          <div>
            <dt class="label-overline">Données</dt>
            <dd class="mt-1 text-lg font-semibold text-(--color-text)">Locales</dd>
          </div>
          <div>
            <dt class="label-overline">Types</dt>
            <dd class="mt-1 text-lg font-semibold text-(--color-text)">6+ catégories</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
