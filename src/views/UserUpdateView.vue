<script setup lang="ts">
import {Database} from "@/db";
import {useOperation} from "@/hooks";
import {Field, Form} from 'vee-validate';
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";

const db = Database.inject();
const users = db.get("user");

const route = useRoute();
const router = useRouter();

const item = computed(() => users.getById(route.params.id));

const [onSubmit, {loading}] = useOperation(async (values: any) => {
  const user = await users.update(values.id, values);

  if (user) {
    router.push(`/users/${user.id}`);
  }
});

if (!item.value) {
  router.push('/users');
}
</script>

<template>
  <Form as="el-form" @submit="onSubmit" label-width="auto" :initial-values="item">
    <Field name="id" v-slot="{value, field, errorMessage}" rules="required|min:3">
      <el-form-item :error="errorMessage" label="ID">
        <el-input placeholder="Иванов Иван" v-bind="field" :model-value="value" disabled />
      </el-form-item>
    </Field>
    <Field name="name" v-slot="{value, field, errorMessage}" rules="required|min:3">
      <el-form-item :error="errorMessage" label="ФИО">
        <el-input placeholder="Иванов Иван" v-bind="field" :model-value="value" />
      </el-form-item>
    </Field>
    <Field name="email" v-slot="{value, field, errorMessage}" rules="email|required">
      <el-form-item :error="errorMessage" label="Email">
        <el-input placeholder="vue@dev.com" v-bind="field" :model-value="value" />
      </el-form-item>
    </Field>
    <Field name="registeredAt" v-slot="{value, field, errorMessage}" rules="required">
      <el-form-item :error="errorMessage" label="Регистрация">
        <el-date-picker v-bind="field" :model-value="value" type="date" placeholder="Выберите дату" />
      </el-form-item>
    </Field>

    <el-button type="primary" native-type="submit" :loading="loading">Обновить</el-button>
  </Form>
</template>
