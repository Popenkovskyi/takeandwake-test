<template>
    <form
        class="flex flex-col justify-center h-[100dvh] gap-2"
        @submit.prevent="handleLogin"
    >
        <h2>Login</h2>

        <UInput
            v-model="auth.credentials.username"
            @input="clearError"
            type="text"
            autocomplete="username"
            placeholder="Введите логин"
            required
        />

        <UInput
            v-model="auth.credentials.password"
            @input="clearError"
            placeholder="Введите пароль"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
            required
        >
            <template #trailing>
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="showPassword ? 'Hide password' : 'showPassword password'"
                    :aria-pressed="showPassword"
                    aria-controls="password"
                    @click="showPassword = !showPassword"
                />
            </template>
        </UInput>

        <UButton
            class="flex justify-center items-center"
            type="submit"
            :loading="loading"
            :disabled="loading"
        >
            Войти
        </UButton>

        <div v-if="error" class="relative">
            <p class="absolute bottom-[-24px]">{{ error }}</p>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import { navigateTo } from "nuxt/app";

const auth = useAuthStore();
const error = ref<string>("");

const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);

async function handleLogin(): Promise<void> {
    loading.value = true;

    await new Promise((res) => {
        setTimeout(() => {
            if (auth.login()) {
                navigateTo("/account");
                return;
            }

            error.value = "Введены неверные данные авторизации.";
            res("resolve");
        }, 1000);
    });

    loading.value = false;
}

function clearError(): void {
    if (error.value) error.value = "";
}
</script>
