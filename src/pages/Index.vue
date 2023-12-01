<script setup>
import SurveyForm from '@/component/form/SurveyForm.vue'

import { useRouter } from 'vue-router'
import { ref, reactive, getCurrentInstance, watch, nextTick } from 'vue'
import { createResult } from '@/plugins/api'
import { useToast } from 'primevue/usetoast'

const {
  proxy: { $user },
} = getCurrentInstance()
const toast = useToast()
const router = useRouter()

const surveyFormRef = ref(null)

const loginState = reactive({
  isAdmin: false,
  projectCode: '',
})

const navigatePage = () => {
  router.push('/result')
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
  async () => {
    loginState.isAdmin = $user.loginState?.isAdmin
    loginState.projectCode = $user.loginState?.projectCode
    // SurveyForm DOM 渲染完成
    await nextTick()
    surveyFormRef.value.resetForm()
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
  <SurveyForm :loginState="loginState" ref="surveyFormRef" @submitForm="submitForm" />
  <Toast />
</template>

<style></style>
