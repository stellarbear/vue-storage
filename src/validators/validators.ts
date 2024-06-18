import {defineRule} from 'vee-validate';

defineRule('email', (value: string) => {
    if (!value || !value.length) {
        return true;
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
        return 'Не валидный email адрес';
    }
    return true;
});

defineRule('required', (value: string) => {
    if ((value === undefined) ||
        (typeof value === "string" && value.length === 0)
    ) {
        return 'Поле обязательно для заполнения';
    }

    return true;
});

defineRule('min', (value: string, [limit]: [number]) => {
    if (!value || !value.length) {
        return true;
    }

    if (value.length < limit) {
        return `Минимум ${limit} символа(ов)`;
    }

    return true;
});
