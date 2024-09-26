<script setup lang="ts">
import CustomTable, { type TableActions } from '@/components/CustomTable.vue';
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
const deleteAChildCare = async (childCare: ChildCare) => {
    const response = await customFetch(`child-care/${childCare.id}`, {}, { method: 'DELETE' });
    if (response?.rowAffected === 1)
        childcareData.value = childcareData.value.filter((el) => el.id != childCare.id);
};
const actions: TableActions = [
    {
        icon: 'bi bi-trash btn btn-danger',
        title: 'Supprimer cette creche',
        callback: deleteAChildCare,
    },
];
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
        :actions="actions"
    />
</template>
