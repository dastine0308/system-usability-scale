<script setup>
import LayoutHeader from '@/component/layout/LayoutHeader.vue'
import layoutContent from '@/component/layout/layoutContent.vue'
import LoginForm from '@/component/form//LoginForm.vue'
import { ref, computed, getCurrentInstance, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const {
  proxy: { $user },
} = getCurrentInstance()
const $route = useRoute()
const router = useRouter()

const modalVisible = ref(false)

const isIndex = computed(() => {
  return $route.path === '/' || $route.path === '/index'
})

const closeLoginModal = ({ isAdmin, projectCode }) => {
  modalVisible.value = false
  $user.signIn({
    isAdmin,
    projectCode,
  })
}

watch(
  () => $user.loginState,
  async val => {
    if (!val || Object.keys(val).length === 0) {
      modalVisible.value = true
      if (!isIndex.value) router.push('/')
    }
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div class="mainPage">
    <div class="container mx-auto mt-[66px] w-full relative">
      <LayoutHeader />
      <layoutContent />
    </div>
  </div>
  <Dialog
    v-model:visible="modalVisible"
    modal
    :pt="{
      mask: { style: 'backdrop-filter: blur(2px)' },
      root: {
        style: 'background: transparent linear-gradient(119deg, #1489D1 0%, #20B6B2 100%) 0% 0% no-repeat padding-box',
        class: 'rounded-lg',
      },
    }"
  >
    <template #container>
      <LoginForm @closeLoginModal="closeLoginModal" />
    </template>
  </Dialog>
</template>

<style>
.mainPage {
  display: flex;
  min-height: 100vh;
  font-weight: normal;
  background: transparent linear-gradient(119deg, #1489d1 0%, #20b6b2 100%) 0% 0% no-repeat padding-box;
}
</style>
