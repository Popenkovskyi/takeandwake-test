import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useAuthStore();
    user.restoreSession();

    if (user.isAuthenticated && to.path === '/')
        return navigateTo('/account');

    if (!user.isAuthenticated && to.path !== '/')
        return navigateTo('/')
})