import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "./validators/validators";

import {createApp} from 'vue';
import App from './App.vue';

import {Database, type DatabaseInfer} from "./db";
import {models} from "./model";
import router from './router';

models.user.mock();

const db = Database.initialize()
    .register("user", models.user.UserRepository, models.user.UserProvider);

declare module "@/db/database/plugin" {
    export interface DatabaseSchema extends DatabaseInfer<typeof db> { }
}

const app = createApp(App);

app.use(Database.plugin, {db});
app.use(ElementPlus);
app.use(router);

await db.get("user").intialize();

app.mount('#app');
