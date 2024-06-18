<script setup lang="ts">
import {Database} from "@/db";
import {computed} from "vue";
import UserListViewRow from "./UserListViewRow.vue";
import {useOperation} from "@/hooks";

const db = Database.inject();
const users = db.get("user");
const items = computed(() => users.getAll());

const [update, {loading}] = useOperation(users.intialize.bind(users));

</script>

<template>
  <el-space direction="vertical" alignment="flex-start">
    <el-table :data="items" style="width: 100%">
      <el-table-column label="ФИО" width="180">
        <template #default="scope">
          <RouterLink :to="'/users/' + scope.row.id">
            <el-link type="primary">{{ scope.row.name }}</el-link>
          </RouterLink>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email" width="300" />
      <el-table-column label="Регистрация" width="180">
        <template #default="scope">
          <span>{{ new Date(scope.row.registeredAt).toLocaleDateString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Действия" width="300">
        <template #default="scope">
          <UserListViewRow :id="scope.row.id" />
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" :loading="loading" @click="update">Обновить</el-button>
  </el-space>
</template>
