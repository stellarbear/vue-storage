<script setup lang="ts">
import {Database} from "@/db";
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";

const db = Database.inject();
const users = db.get("user");

const route = useRoute();
const router = useRouter();

const item = computed(() => users.getById(route.params.id));

if (!item.value) {
  router.push('/users');
}
</script>

<template>
  <el-space direction="vertical" alignment="flex-start" v-if="item">
    <el-descriptions direction="vertical" :column="4" border title="Информация о пользователе">
      <el-descriptions-item label="id">{{ item.id }}</el-descriptions-item>
      <el-descriptions-item label="ФИО">{{ item.name }}</el-descriptions-item>
      <el-descriptions-item label="Email">{{ item.email }}</el-descriptions-item>
      <el-descriptions-item label="Регистрация">{{ item.registeredAt }}</el-descriptions-item>
    </el-descriptions>

    <RouterLink :to="'/users/update/' + item.id">
      <el-button type="primary" native-type="submit">Редактировать</el-button>
    </RouterLink>
  </el-space>
</template>
