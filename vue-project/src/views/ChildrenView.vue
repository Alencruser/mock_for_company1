<script setup lang="ts">
import CustomTable from '@/components/CustomTable.vue';
import type { Child } from '@/models/Child';
import { customFetch } from '@/utils/customFetch';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const childData = ref<Child[]>([]);
const tableHeaders: (keyof Child)[] = ['id', 'first_name', 'last_name', 'referent'];
const translations: Record<keyof Child, string> = {
    id: 'Id',
    first_name: 'Prenom',
    last_name: 'Nom',
    referent: 'Referent',
};
onMounted(async () => {
    const results = await customFetch(`child-care/${route.params.childCareId}/children`);
    if (results?.length) childData.value = results;
});
</script>

<template>
    <CustomTable
        :data="childData"
        :headers="tableHeaders"
        :translations="translations"
        :identifier="'id'"
    />
</template>
