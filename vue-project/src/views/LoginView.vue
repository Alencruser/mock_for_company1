<script setup lang="ts">
import { authService } from '@/services/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref<string>('');
const email = ref<string>('');
const router = useRouter();
const amIregistering = ref<boolean>(false);

const handleRequest = async () => {
    if (amIregistering.value === false) {
        await authService.login(username.value);
        if (authService.isConnected()) {
            router.push({ name: 'home' });
        } else {
            amIregistering.value = true;
        }
    } else {
        await authService.register(username.value, email.value);
        router.push({ name: 'home' });
    }
};
</script>

<template>
    <div class="row" id="login-view">
        <div class="col-md-3 offset-4 justify-content-center my-auto p-5">
            <form @submit.prevent="handleRequest">
                <div class="mb-3">
                    <label for="username" class="form-label"> Nom d'utilisateur </label>
                    <input type="text" class="form-control" id="username" v-model="username" />
                </div>
                <div class="mb-3" v-if="amIregistering">
                    <label for="email" class="form-label"> Email </label>
                    <input
                        type="text"
                        class="form-control"
                        id="email"
                        v-model="email"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" class="form-text">
                        Nous n'avons pas trouver votre utilisateur, veuillez renseigner votre email
                        afin de vous inscrire
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">
                    {{ amIregistering ? "S'inscrire" : 'Se connecter' }}
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
#login-view {
    height: 100vh;
}
#login-view > .p-5 {
    border: solid 1px var(--bs-primary);
    border-radius: 20px;
    box-shadow: 10px 5px 5px var(--bs-primary);
}
#login-view #emailHelp {
    color: var(--bs-danger);
}
</style>
