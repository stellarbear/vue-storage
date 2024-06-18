import type {App, InjectionKey} from "vue";
import {inject as vueinject} from 'vue';
import type {Database} from "./database";

export interface DatabaseSchema { }

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $db: Database<DatabaseSchema>;
    }
}

export function DatabasePlugin(key: InjectionKey<Database<DatabaseSchema>>) {
    return class Injectable {
        public static inject() {
            const db = vueinject(key);
            if (!db) {
                throw new Error("database is not wired");
            }

            return db;
        }

        public static get plugin() {
            return {
                install: (app: App, options: {db: Database<DatabaseSchema>;}) => {
                    app.config.globalProperties.$db = options.db;
                    app.provide(key, options.db);
                }
            };
        }
    };
};
