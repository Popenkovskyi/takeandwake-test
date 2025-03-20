<template>
    <div>
        <div class="flex justify-between">
            <FilterPanel />
            <UButton class="h-[32px]" @click="auth.logout()">Выход</UButton>
        </div>
        <UserTable class="mt-4"/>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import FilterPanel from "~/components/FilterPanel.vue";
import UserTable from "~/components/UserTable.vue";

const auth = useAuthStore();
</script>
