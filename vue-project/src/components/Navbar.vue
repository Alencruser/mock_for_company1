<script setup lang="ts">
import { authService } from '@/services/auth';
import { useRouter } from 'vue-router';
const username: string = authService.getUser();
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand">Bonjour {{ username }}</a>

            <div class="" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                </div>
            </div>
            <div class="">
                <button class="btn btn-danger" type="button" @click="authService.disconnect">
                    Se deconnecter
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
