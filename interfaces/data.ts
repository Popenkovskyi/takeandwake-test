import { type Ref } from 'vue';
import { type CalendarDate } from "@internationalized/date";

export enum CoffeStatuses {
    'Все', 'В наличии', 'Отсутствует', 'В пути', 'Больше нет'
}

export enum CoffeeType {
    'Все', 'Робуста', 'Арабика'
}

export enum CoffeeRoastingDegree {
    'Все', 'Светлая', 'Средняя', 'Темная'
}

export interface CoffeeItems {
    id: string;
    name: string;
    status: keyof typeof CoffeStatuses;
    date_created: string;
    type: keyof typeof CoffeeType;
    roasting_degree: keyof typeof CoffeeRoastingDegree;
    weight: number;
}

export interface CoffeeFilters {
    status: keyof typeof CoffeStatuses;
    type: keyof typeof CoffeeType;
    roasting_degree: keyof typeof CoffeeRoastingDegree;
    date: Ref<{
        start: CalendarDate | null,
        end: CalendarDate | null,
    }>;
}