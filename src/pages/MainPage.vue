<script setup>
import LayoutHeader from '@/component/layout/LayoutHeader.vue'
import layoutContent from '@/component/layout/layoutContent.vue'
</script>

<template>
  <div class="mainPage">
    <div class="container mx-auto mt-[66px] w-full relative">
      <LayoutHeader />
      <layoutContent />
    </div>
  </div>
</template>

<style>
.mainPage {
  display: flex;
  min-height: 100vh;
  font-weight: normal;
  background: transparent linear-gradient(119deg, #1489d1 0%, #20b6b2 100%) 0% 0% no-repeat padding-box;
}
</style>
