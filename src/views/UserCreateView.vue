<script setup lang="ts">
import {Database} from "@/db";
import {useOperation} from "@/hooks";
import {Field, Form} from 'vee-validate';
import {useRouter} from "vue-router";

const db = Database.inject();
const users = db.get("user");

const router = useRouter();

const [onSubmit, {loading}] = useOperation(async (values: any) => {
  const user = await users.create(values);

  if (user) {
    router.push(`/users/${user.id}`);
  }
});
</script>

<template>
  <Form as="el-form" @submit="onSubmit" label-width="auto">
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

    <el-button type="primary" native-type="submit" :loading="loading">Создать</el-button>
  </Form>
</template>
