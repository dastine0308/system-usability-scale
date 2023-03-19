<script setup>
import SurveyForm from '../component/SurveyForm.vue'
</script>

<template>
  <div class="container mx-auto mt-[66px]">
    <h1 class="text-white font-bold text-center">SUS-系統易用性量表</h1>
    <hr class="my-4">
    <p class="text-white text-center">
      SUS 是由 John Brooke 在 1986 年創建到現在，一直被廣泛應用在快速測試產品系統介面、桌面程式與網站介面上。
    </p>
    <form class="bg-white mt-[40px] p-[40px] rounded-[10px] flex flex-col items-center justify-center">
      <!-- <div class="form-content">
        <div class="form-item">
        </div>
      </div> -->
      <SurveyForm />
      <button class="bg-gradient-to-r from-[#1489D1] to-[#20B6B2] rounded-[20px] min-w-[116px] md:min-w-[352px] min-h-[40px] text-white mt-[40px]">
        送出
      </button>
    </form>
  </div>
  
</template>

<style lang="scss" scoped>
</style>
