<script setup lang="ts">
import {Database} from "@/db";
import {useOperation} from "@/hooks";

const props = defineProps({
  id: {type: String, required: true},
});

const db = Database.inject();
const users = db.get("user");

const [remove, {loading}] = useOperation(() => users.remove(props.id));
</script>

<template>
  <el-space wrap>
    <el-button link type="danger" size="small" @click.prevent="remove" :loading="loading">
      Удалить
    </el-button>

    <RouterLink :to="'/users/update/' + props.id">
      <el-link type="primary">
        Редактировать
      </el-link>
    </RouterLink>

    <RouterLink :to="'/users/' + props.id">
      <el-link type="primary">
        Просмотр
      </el-link>
    </RouterLink>
  </el-space>
</template>
