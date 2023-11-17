<script setup>
import LoginCard from "@/component/LoginCard.vue"
import { ref, computed, watch, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const { proxy: { $user } } = getCurrentInstance()
const $route = useRoute()
const router = useRouter()

const modalVisible = ref(false)

const isIndex = computed(() => {
  return $route.path === '/' || $route.path === '/index'
})

const closeLoginModal = ({isAdmin, projectCode}) => {
  modalVisible.value = false
  $user.signIn({
    isAdmin,
    projectCode
  })
}

watch(() => $user.loginState, (val)=> {
  if(!val || Object.keys(val).length === 0) {
    modalVisible.value = true
    if(!isIndex.value) router.push('/')
  }
}, {deep: true, immediate: true})

</script>

<template>
  <div class="container mx-auto mt-[66px] w-full relative">
    <div class="absolute right-0">
      <Button icon="pi pi-sign-out" class="text-white border-white" rounded outlined aria-label="Filter" @click="$user.signOut()"/>
    </div>
    <h1 class="text-white font-bold text-center">SUS-系統易用性量表</h1>
    <hr class="my-4 text-white">
    <p class="text-white text-center">
      SUS 是由 John Brooke 在 1986 年創建到現在，一直被廣泛應用在快速測試產品系統介面、桌面程式與網站介面上。
    </p>
    <div class="bg-white mt-[40px] mb-[60px] p-[40px] rounded-[10px]">
      <router-view />
    </div>
  </div>

  <Dialog
    v-model:visible="modalVisible"
    modal
    :pt="{
      mask: { style: 'backdrop-filter: blur(2px)' },
      root: { style: 'background: transparent linear-gradient(119deg, #1489D1 0%, #20B6B2 100%) 0% 0% no-repeat padding-box', class: 'rounded-lg' } 
    }"
>
    <template #container>
      <LoginCard @closeLoginModal="closeLoginModal"/>
    </template>
  </Dialog>
</template>

<style></style>
