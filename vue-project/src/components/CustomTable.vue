<script setup lang="ts">
interface DataTableProps<T> {
    data: T[];
    headers: (keyof T)[];
    translations: Record<keyof T, string>;
    identifier: keyof T;
}

defineProps<DataTableProps<any>>();
</script>
<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="title in $props.headers">{{ $props.translations[title] }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in $props.data">
                <th scope="row">{{ item[$props.identifier] }}</th>
                <td v-for="column in $props.headers.filter((el) => el !== $props.identifier)">
                    {{ item[column as keyof typeof item] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
