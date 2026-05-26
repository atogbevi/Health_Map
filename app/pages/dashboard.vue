<template>
  <div class="flex flex-col gap-10 py-20">
    <EntitiesCount />
    <section class="flex flex-col gap-10 lg:flex-row">
        <DashboardCategoryChart class="flex-1" />
    </section>
    <DashboardTopLocalitiesChart class="flex-1 mx-6 lg:mx-12" />

  </div>
</template>
