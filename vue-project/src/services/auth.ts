import type { User } from '@/models/User';
import { customFetch } from '@/utils/customFetch';
export const authService = {
    async login(username: string): Promise<User | Error | null> {
        const response = await customFetch(`user?username=${username}`);
        if (response?.username?.length) this.storeUser(response.username);
        return response;
    },
    async register(username: string, email: string): Promise<User | Error | null> {
        const response = await customFetch('user', { username, email }, { method: 'PUT' });
        if (response?.username?.length) this.storeUser(response.username);
        return response;
    },
    storeUser(username: string): void {
        window.localStorage.setItem('username', username);
        window.dispatchEvent(new Event('storage'));
    },
    getUser(): string {
        return window.localStorage.getItem('username') || '';
    },
    isConnected(): boolean {
        return (localStorage.getItem('username') || '').length > 0;
    },
    disconnect(): void {
        window.localStorage.removeItem('username');
        window.dispatchEvent(new Event('storage'));
    },
};
