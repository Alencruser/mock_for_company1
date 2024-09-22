<script setup lang="ts">
import { BCol, BContainer, BNav, BNavItem, BRow } from 'bootstrap-vue-next';
const username = localStorage.getItem('username');
const amIConnected = username?.length;
</script>

<template>
    <BContainer v-if="amIConnected">
        <BRow>
            <BCol alignSelf="center">
                <BNav tabs>
                    <BNavItem active>Active</BNavItem>
                    <BNavItem>Link</BNavItem>
                    <BNavItem>Another Link</BNavItem>
                    <BNavItem disabled>Bonjour {{ username }}</BNavItem>
                </BNav>
            </BCol>
        </BRow>
    </BContainer>
</template>

<style scoped>
#navbar {
    position: fixed;
    top: 0;
}
</style>
