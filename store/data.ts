import { defineStore } from 'pinia';
import { shallowRef, ref, computed } from 'vue';
import { type CalendarDate, getLocalTimeZone } from "@internationalized/date";
import type { CoffeeFilters, CoffeeItems, CoffeeRoastingDegree, CoffeeType, CoffeStatuses } from '~/interfaces/data';

export const useDataStore = defineStore('data', () => {
    const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'date_created', header: 'Дата' },
        { accessorKey: 'name', header: 'Название' },
        { accessorKey: 'status', header: 'Статус' },
        { accessorKey: 'type', header: 'Тип' },
        { accessorKey: 'roasting_degree', header: 'Степень обжарки' },
        { accessorKey: 'weight', header: 'Вес (кг)' }
    ];

    const items: CoffeeItems[] = [
        {
            id: "1",
            name: "Brazil Santos",
            status: "В наличии",
            date_created: "2025-03-20",
            type: "Арабика",
            roasting_degree: "Средняя",
            weight: 25
        },
        {
            id: "2",
            name: "Colombia Supremo",
            status: "В пути",
            date_created: "2025-03-18",
            type: "Арабика",
            roasting_degree: "Темная",
            weight: 50
        },
        {
            id: "3",
            name: "Vietnam Robusta",
            status: "Отсутствует",
            date_created: "2025-03-15",
            type: "Робуста",
            roasting_degree: "Светлая",
            weight: 40
        },
        {
            id: "4",
            name: "Ethiopia Yirgacheffe",
            status: "В наличии",
            date_created: "2025-03-17",
            type: "Арабика",
            roasting_degree: "Средняя",
            weight: 30
        },
        {
            id: "5",
            name: "India Cherry AA",
            status: "Больше нет",
            date_created: "2025-03-10",
            type: "Робуста",
            roasting_degree: "Темная",
            weight: 10
        },
        {
            id: "6",
            name: "Guatemala Huehuetenango",
            status: "В наличии",
            date_created: "2025-03-19",
            type: "Арабика",
            roasting_degree: "Светлая",
            weight: 60
        },
        {
            id: "7",
            name: "Kenya AA",
            status: "В пути",
            date_created: "2025-03-16",
            type: "Арабика",
            roasting_degree: "Темная",
            weight: 35
        },
        {
            id: "8",
            name: "Sumatra Mandheling",
            status: "Отсутствует",
            date_created: "2025-03-14",
            type: "Арабика",
            roasting_degree: "Средняя",
            weight: 20
        },
        {
            id: "9",
            name: "Mexico Altura",
            status: "В наличии",
            date_created: "2025-03-12",
            type: "Арабика",
            roasting_degree: "Темная",
            weight: 45
        },
        {
            id: "10",
            name: "Uganda Robusta",
            status: "Больше нет",
            date_created: "2025-03-08",
            type: "Робуста",
            roasting_degree: "Светлая",
            weight: 15
        },
        {
            id: "11",
            name: "Honduras Marcala",
            status: "В пути",
            date_created: "2025-03-13",
            type: "Арабика",
            roasting_degree: "Средняя",
            weight: 55
        },
        {
            id: "12",
            name: "Peru Chanchamayo",
            status: "В наличии",
            date_created: "2025-03-11",
            type: "Арабика",
            roasting_degree: "Светлая",
            weight: 70
        },
        {
            id: "13",
            name: "Rwanda Bourbon",
            status: "Отсутствует",
            date_created: "2025-03-09",
            type: "Арабика",
            roasting_degree: "Темная",
            weight: 25
        },
        {
            id: "14",
            name: "Tanzania Peaberry",
            status: "В наличии",
            date_created: "2025-03-07",
            type: "Арабика",
            roasting_degree: "Средняя",
            weight: 80
        },
        {
            id: "15",
            name: "Papua New Guinea Sigri",
            status: "В пути",
            date_created: "2025-03-06",
            type: "Арабика",
            roasting_degree: "Светлая",
            weight: 90
        }
    ];

    const statuses = ref<Array<keyof typeof CoffeStatuses>>(['Все', 'В наличии', 'Отсутствует', 'В пути', 'Больше нет']);
    const coffeeType = ref<Array<keyof typeof CoffeeType>>(['Все', 'Робуста', 'Арабика']);
    const roastingDegrees = ref<Array<keyof typeof CoffeeRoastingDegree>>(['Все', 'Светлая', 'Средняя', 'Темная']);


    const filter = ref<CoffeeFilters>({
        status: 'Все',
        type: 'Все',
        roasting_degree: 'Все',
        date: ref({
            start: null,
            end: null
        })
    });

    function formatDate(calendarDate: CalendarDate | null) {
        if (!calendarDate) return;

        const date = calendarDate.toDate(getLocalTimeZone());
        return date.toISOString().split('T')[0];
    };

    const filteredItems = computed<CoffeeItems[]>(() => {
        return items.filter(item => {
            const matchesStatus = filter.value.status === 'Все' || item.status === filter.value.status;
            const matchesType = filter.value.type === 'Все' || item.type === filter.value.type;
            const matchesRoastingDegree = filter.value.roasting_degree === 'Все' || item.roasting_degree === filter.value.roasting_degree;

            const startDate = formatDate(filter.value.date.start);
            const endDate = formatDate(filter.value.date.end);

            const matchesDate = (
                (startDate === undefined || item.date_created >= startDate) &&
                (endDate === undefined || item.date_created <= endDate)
            );

            return matchesStatus &&
                matchesType &&
                matchesRoastingDegree &&
                matchesDate;
        });
    });

    return {
        items,
        columns,
        filter,
        filteredItems,

        statuses,
        coffeeType,
        roastingDegrees,
    };
});
