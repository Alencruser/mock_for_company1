<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { authService } from '@/services/auth';
import { RouterView, useRouter } from 'vue-router';

const router = useRouter();
window.addEventListener('storage', () => {
    if (!authService.isConnected()) router.push({ name: 'login' });
});
</script>

<template>
    <Navbar />
    <RouterView />
</template>
