<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <el-space direction="vertical" fill>
    <el-space wrap>
      <RouterLink to="/users">
        <el-link type="primary">
          Пользователи
        </el-link>
      </RouterLink>
      <RouterLink to="/users/create">
        <el-link type="primary">
          Создать
        </el-link>
      </RouterLink>
    </el-space>

    <el-card>
      <RouterView />
    </el-card>
  </el-space>
</template>
