<script setup>
    const locationItems = [
        { id: 1, label: "Toikoin Elavanyo" },
        { id: 2, label: "Adidogomé" },
        { id: 3, label: "Bè-Kpota" },
        { id: 4, label: "Djidjolé" },
        { id: 5, label: "Agoè" },
        { id: 6, label: "Hanoukopé" },
        { id: 7, label: "Tokoin Solidarité" },
        { id: 8, label: "Kodjoviakopé" },
        { id: 9, label: "Avenou" },
        { id: 10, label: "Wuiti" },
    ]

    const providerItems = [
        { id: 1, label: "Pharmacies" },
        { id: 2, label: "Centres de santé" },
        { id: 3, label: "Hôpitaux" },
        { id: 4, label: "Cliniques" },
        { id: 3, label: "Institutions" },
        { id: 4, label: "Health Tech" },
    ]

    // const locationOpen = ref(false)
    const selectedProvider = ref(null)
    
    // function toggleLocation() {
    //     locationOpen.value =! locationOpen.value
    // }

    // function selectProvider(item) {
    //     selectedProvider.value = item
    // }

</script>

<template>
    <section>
        <div class="flex flex-col gap-10">

            <!-- LOCATION -->
            <div class="flex flex-col gap-4">

                <h3 class="text-md font-semibold">LOCATION</h3>

                <select class="flex px-8 py-4 bg-white dark:bg-gray-800 rounded-lg">
                    <option v-for="item in locationItems" :key="item.id">{{ item.label }}</option>
                </select>

            </div>

            <!-- PROVIDER TYPE -->
            <div class="flex flex-col gap-4">
                <h3 class="text-md font-semibold"> PROVIDER TYPE </h3>

                <div class="flex flex-col gap-2 py-4 px-8 bg-white dark:bg-gray-800 rounded-lg">
                    <label v-for="item in providerItems" :key="item.id" class="flex items-center gap-2">
                        <input
                            type="checkbox"
                            :value="item.id"
                            class="h-4 w-4 rounded-sm"
                            v-model="selectedProvider"
                        />
                        {{ item.label }}

                    </label>
                </div>

            </div>
        </div>
    </section>
</template>