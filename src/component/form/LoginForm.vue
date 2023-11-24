<script setup>
import { onMounted, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { useLoadProjects } from '@/plugins/api'

const $emit = defineEmits(['closeLoginModal'])

const { handleSubmit: handleLogin } = useForm()
const { value: selectedProject, errorMessage: projectErrMsg } = useField('name', validateName)
const { value: password, errorMessage: pwdErrMsg, setErrors } = useField('password', validatePwd)

const dropdownLoading = ref(false)
const projectOpts = ref([])

function validateName(value) {
  if (!value) return '請選擇專案名稱'
  return true
}

function validatePwd(value) {
  if (!value) return '請輸入密碼'
  return true
}

const login = handleLogin(values => {
  // TEST:
  const admin = 'VL905'
  const emp = '0000'

  if (values?.password !== admin && values?.password !== emp) {
    setErrors('密碼錯誤')
    return
  }

  $emit('closeLoginModal', {
    isAdmin: values?.password === admin,
    projectCode: selectedProject.value.code,
  })
})

// API:
const fetchProjectOpts = async () => {
  try {
    dropdownLoading.value = true
    const resp = await useLoadProjects()
    if (resp) {
      projectOpts.value = JSON.parse(JSON.stringify(resp))
    }
    dropdownLoading.value = false
  } catch (e) {
    console.error('Error: ', e)
  }
}

onMounted(() => {
  fetchProjectOpts()
})
</script>

<template>
  <form @submit="login" class="flex flex-col items-center px-20 py-8 gap-2 text-white" style="border-radius: 12px">
    <img src="@/assets/logo_favicon_white.svg" class="w-[35px] h-[35px] mb-4" />
    <span class="p-float-label w-full">
      <Dropdown
        v-model="selectedProject"
        :loading="dropdownLoading"
        :options="projectOpts"
        optionLabel="name"
        :class="{ 'p-invalid': projectErrMsg }"
        aria-describedby="dd-error"
      />
      <label for="name" class="text-white">專案名稱</label>
    </span>
    <small class="p-error" id="dd-error">{{ projectErrMsg || '&nbsp;' }}</small>
    <span class="p-float-label">
      <InputText
        id="password"
        v-model="password"
        type="text"
        :class="{ 'p-invalid': pwdErrMsg }"
        aria-describedby="text-error"
      />
      <label for="password" class="text-white">密碼</label>
    </span>
    <small class="p-error" id="text-error">{{ pwdErrMsg || '&nbsp;' }}</small>
    <Button
      label="登入"
      type="submit"
      @click="login"
      text
      class="rounded-lg w-full text-white border border-white hover:bg-white-alpha-10"
    ></Button>
  </form>
</template>

<style scoped>
:deep(.p-inputtext),
:deep(.p-dropdown .p-dropdown-trigger) {
  @apply text-white;
}
:deep(.p-float-label .p-component) {
  @apply bg-[#f2f6f666] md:w-full rounded-lg;
}
:deep(.p-button) {
  @apply rounded-lg;
}
</style>
