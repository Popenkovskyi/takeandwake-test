<template>
    <UTable :data="data.filteredItems" :columns="data.columns" class="flex-1" />
</template>

<script setup lang="ts">
import { useDataStore } from "~/store/data";

const data = useDataStore();
</script>
