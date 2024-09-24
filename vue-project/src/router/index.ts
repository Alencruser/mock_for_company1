import { authService } from '@/services/auth';
import ChildCaresView from '@/views/ChildCaresView.vue';
import ChildrenView from '@/views/ChildrenView.vue';
import LoginView from '@/views/LoginView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'child-cares',
                    component: ChildCaresView,
                },
                {
                    path: 'children/:childCareId',
                    name: 'children',
                    component: ChildrenView,
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isAuthenticated = authService.isConnected();

    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
