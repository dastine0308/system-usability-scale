<script setup>
import LoginForm from '@/component/form//LoginForm.vue'
import SurveyForm from '@/component/form/SurveyForm.vue'

import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, watch, getCurrentInstance, nextTick, computed } from 'vue'
import { createResult } from '@/plugins/api'
import { useToast } from 'primevue/usetoast'

const {
  proxy: { $user },
} = getCurrentInstance()
const toast = useToast()
const $route = useRoute()
const router = useRouter()

const modalVisible = ref(false)

const isIndex = computed(() => {
  return $route.path === '/' || $route.path === '/index'
})

const surveyFormRef = ref(null)

const loginState = reactive({
  isAdmin: false,
  projectCode: '',
})

const navigatePage = () => {
  router.push('/result')
}

const closeLoginModal = ({ isAdmin, projectCode }) => {
  modalVisible.value = false
  $user.signIn({
    isAdmin,
    projectCode,
  })
}

// API:
const submitForm = async score => {
  try {
    const id = await createResult(loginState.projectCode, { score })
    console.log('送出成功', id)
    toast.add({ severity: 'success', summary: '送出成功', life: 3000 })
    surveyFormRef.value.resetForm()
  } catch (e) {
    console.error('Error: ', e)
  }
}

watch(
  () => $user.loginState,
  async val => {
    if (!val || Object.keys(val).length === 0) {
      modalVisible.value = true
      if (!isIndex.value) router.push('/')
      // SurveyForm DOM 渲染完成
      await nextTick()
      surveyFormRef.value.resetForm()
      return
    }
    loginState.isAdmin = val?.isAdmin
    loginState.projectCode = val?.projectCode
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <Button
    v-if="loginState.isAdmin"
    type="button"
    label="測試結果"
    badge="?"
    badgeClass="p-badge-danger"
    outlined
    @click="navigatePage"
  />
  <SurveyForm ref="surveyFormRef" @submitForm="submitForm" />
  <Toast />
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

<style></style>
