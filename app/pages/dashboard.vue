<template>
  <div class="flex flex-col gap-12 pb-8">
    <section class="page-container pt-10">
      <header class="page-header mb-0">
        <h1 class="page-title">Tableau de bord</h1>
        <p class="page-subtitle">
          Vue d'ensemble des structures de santé enregistrées et de leur répartition géographique.
        </p>
      </header>
    </section>

    <EntitiesCount />

    <section class="page-container flex flex-col gap-8">
      <DashboardCategoryChart />
      <DashboardTopLocalitiesChart />
    </section>
  </div>
</template>
