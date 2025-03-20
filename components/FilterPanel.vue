<template>
    <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
            <label>Статус:</label>
            <USelect v-model="data.filter.status" :items="data.statuses" class="w-48" />
        </div>

        <br />

        <div class="flex items-center gap-2">
            <label>Тип кофе:</label>
            <USelect v-model="data.filter.type" :items="data.coffeeType" class="w-48" />
        </div>

        <div class="flex items-center gap-2">
            <label>Степень обжарки:</label>
            <USelect
                v-model="data.filter.roasting_degree"
                :items="data.roastingDegrees"
                class="w-48"
            />
        </div>

        <div class="flex items-center gap-2">
            <label>Дата:</label>
            <UPopover>
                <UButton
                    class="w-[250px]"
                    color="neutral"
                    variant="subtle"
                    icon="i-lucide-calendar"
                >
                    <template v-if="data.filter.date.start">
                        <template v-if="data.filter.date.end">
                            {{
                                df.format(
                                    data.filter.date.start.toDate(getLocalTimeZone())
                                )
                            }}
                            -
                            {{
                                df.format(data.filter.date.end.toDate(getLocalTimeZone()))
                            }}
                        </template>

                        <template v-else>
                            {{
                                df.format(
                                    data.filter.date.start.toDate(getLocalTimeZone())
                                )
                            }}
                        </template>
                    </template>
                    <template v-else> Pick a date </template>
                </UButton>

                <template #content>
                    <UCalendar
                        v-model="data.filter.date"
                        class="p-2"
                        :number-of-months="2"
                        range
                    />
                </template>
            </UPopover>
            <UButton @click="clearDateFilter">Очистить</UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from "~/store/data";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";

const data = useDataStore();

const df = new DateFormatter("ru-RU", {
    dateStyle: "medium",
});

function clearDateFilter() {
    data.filter.date.start = null;
    data.filter.date.end = null;
}
</script>
