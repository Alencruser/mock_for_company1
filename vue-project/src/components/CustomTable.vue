<script setup lang="ts">
interface TableAction {
    icon: string;
    callback: Function;
    title: string;
}

export interface TableActions extends Array<TableAction> {}

interface DataTableProps<T> {
    data: T[];
    headers: (keyof T)[];
    translations: Record<keyof T, string>;
    identifier: keyof T;
    actions?: TableActions;
}

defineProps<DataTableProps<any>>();
</script>
<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="title in $props.headers">{{ $props.translations[title] }}</th>
                <th v-if="$props.actions">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in $props.data">
                <th scope="row">{{ item[$props.identifier] }}</th>
                <td v-for="column in $props.headers.filter((el) => el !== $props.identifier)">
                    {{ item[column as keyof typeof item] }}
                </td>
                <td v-for="action in $props.actions">
                    <i
                        :class="action.icon"
                        v-on:click="action.callback(item)"
                        v-bind:title="action.title"
                    ></i>
                </td>
            </tr>
        </tbody>
    </table>
</template>
