import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserCredentials, Users } from '~/interfaces/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<string>('');
    const cookieUser = useCookie('user');
    const isAuthenticated = computed<boolean>(() => !!user.value);

    let users: Users[] = [];

    async function loadMockData(): Promise<void> {
        const mockUsers = await import('~/mock/users.json');
        users = mockUsers.default;
    }
    loadMockData();

    const credentials = reactive<UserCredentials>({
        username: '',
        password: '',
    });

    function login(): boolean {
        const hasRegisteredUser = users.find(user =>
            user.credentials.username === credentials.username &&
            user.credentials.passphrase === credentials.password
        )

        if (!!hasRegisteredUser) {
            user.value = credentials.username;
            cookieUser.value = credentials.username;

            return true;
        }

        return false;
    }

    function logout(): void {
        user.value = '';
        cookieUser.value = '';

        credentials.username = '';
        credentials.password = '';

        navigateTo("/");
    }

    function restoreSession(): void {
        if (cookieUser.value) {
            user.value = cookieUser.value;
        }
    }

    return {
        user,
        isAuthenticated,
        credentials,
        login,
        logout,
        restoreSession
    };
});
