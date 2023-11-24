<script setup>
import { getCurrentInstance } from 'vue'

const {
  proxy: { $user },
} = getCurrentInstance()
</script>

<template>
  <div class="absolute right-0">
    <Button
      icon="pi pi-sign-out"
      class="text-white border-white"
      rounded
      outlined
      aria-label="Filter"
      @click="$user.signOut()"
    />
  </div>
  <h1 class="text-white font-bold text-center">SUS-系統易用性量表</h1>
  <hr class="my-4 text-white" />
</template>

<style></style>
