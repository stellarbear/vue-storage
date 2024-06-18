import {ref} from "vue";

//  TODO: remove deps
export function useOperation<T, A extends any[]>(fn: (...args: A) => T) {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const callback = async (...args: A) => {
        loading.value = true;
        error.value = null;
        return Promise.resolve(fn(...args))
            .finally(() => loading.value = false);
    };

    return [callback, {loading}] as const;
}
