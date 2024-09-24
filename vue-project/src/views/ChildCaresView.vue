<script setup lang="ts">
import CustomTable from '@/components/CustomTable.vue';
import type { ChildCare } from '@/models/Child-care';
import { customFetch } from '@/utils/customFetch';
import { onMounted, ref } from 'vue';
const childcareData = ref<ChildCare[]>([]);
const tableHeaders: (keyof ChildCare)[] = ['id', 'name', 'referent'];
const translations: Record<keyof ChildCare, string> = {
    id: 'Id',
    name: 'Nom',
    referent: 'Referent',
};
onMounted(async () => {
    const results = await customFetch('child-cares');
    if (results?.length) childcareData.value = results;
});
</script>

<template>
    <CustomTable
        :data="childcareData"
        :headers="tableHeaders"
        :translations="translations"
        :identifier="'id'"
    />
</template>
