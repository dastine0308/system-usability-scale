<script setup>
import LoginCard from "./LoginCard.vue";
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { createResult } from '@/api'
import { useToast } from "primevue/usetoast"

const toast = useToast()
const router = useRouter()

const modalVisible = ref(true)
const loginState = reactive({
  isAdmin: false,
  projectCode: ''
})
const qaList = reactive([
  {
    label: '1. 我想我會願意經常使用這個網站/產品。',
    ans: null,
  },
  {
    label: '2. 我覺得這個網站/產品過於複雜。',
    ans: null,
  },
  {
    label: '3. 我認為這個網站/產品很容易使用。',
    ans: null,
  },
  {
    label: '4. 我想我需要有人幫助才能使用這個網站/產品。',
    ans: null,
  },
  {
    label: '5. 我覺得這個網站/產品的功能整合得很好。',
    ans: null,
  },
  {
    label: '6. 我覺得這個網站/產品有太多不一致的地方。',
    ans: null,
  },
  {
    label: '7. 我可以想像大部份的人很快就可以學會使用這個網站/產品。',
    ans: null,
  },
  {
    label: '8. 我覺得這個網站/產品使用起來很麻煩。',
    ans: null,
  },
  {
    label: '9. 我很有自信能使用這個網站/產品。',
    ans: null,
  },
  {
    label: '10. 我需要學會很多額外的資訊，才能使用這個網站/產品。',
    ans: null,
  },
])
const radioBtnList = reactive([
  {
    label: '非常不同意',
    value: 1,
  },
  {
    label: '不同意',
    value: 2,
  },
  {
    label: '普通/不知道',
    value: 3,
  },
  {
    label: '同意',
    value: 4,
  },
  {
    label: '非常同意',
    value: 5,
  },
])

const getScore = () => {
  const sum = qaList
    .map((el, index) => (index % 2 > 0 ? 5 - el.ans : el.ans - 1))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
  return sum * 2.5
}

const navigatePage = () => {
  router.push('/result')
  sessionStorage.setItem('projectCode', JSON.stringify(loginState.projectCode))
}

const closeLoginModal = ({isAdmin, projectCode}) => {
  modalVisible.value = false
  loginState.isAdmin = isAdmin
  loginState.projectCode = projectCode
}

// API:
const onSubmit = async () => {
  try {
    const score = getScore()
    const id = await createResult(selectedProject.value.code, { score })
    console.log('送出成功', id)
    toast.add({ severity: 'success', summary: '送出成功', life: 3000 })
    qaList.map((el)=>el.ans = null)
  } catch(e) {
    console.error('Error: ', e)
  }
}
</script>

<template>
  <div class="w-full border-gray-200 bg-gray-50 md:bg-white rounded-lg overflow-hidden">
    <Button v-if="loginState.isAdmin" type="button" label="測試結果" badge="?" badgeClass="p-badge-danger" outlined @click="navigatePage"/>
    <div class="hidden md:grid grid-cols-2 gap-4 mb-[10px] pr-[16px]">
      <ul class="col-start-2 flex flex-row">
        <li class="text-sm basis-1/5 text-center font-semibold" v-for="item in radioBtnList" :key="item.value">
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div
      v-for="(qa, qaIdx) in qaList"
      :key="qaIdx"
      class="md:grid md:grid-cols-2 md:gap-4 p-[1.5rem] md:p-[1rem]"
      :class="{ 'md:bg-gray-50': qaIdx % 2 === 0 }"
    >
      <p class="font-semibold">{{ qa.label }}</p>
      <ul class="md:col-start-2 flex flex-col md:flex-row">
        <li
          class="md:basis-1/5 flex w-[100%] mt-2 md:mt-0 bg-white md:bg-transparent"
          v-for="(item, idx) in radioBtnList"
          :key="idx"
        >
          <label
            class="w-[100%] relative flex cursor-pointer items-center rounded-full p-3 md:m-auto"
            :for="`qa_${qaIdx}-opt_${idx}`"
          >
            <input
              :id="`qa_${qaIdx}-opt_${idx}`"
              v-model="qaList[qaIdx].ans"
              :value="item.value"
              type="radio"
              class="md:absolute left-[calc((100%-1.25rem)/2)] before:content[''] peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-[#4CAAF5] transition-all bg-white before:absolute before:top-2/4 before:hidden md:before:left-2/4 md:before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#4CAAF5] checked:before:bg-[#4CAAF5] hover:before:opacity-10"
            />
            <div
              class="pointer-events-none absolute top-2/4 left-[calc((1.25rem+24px)/2)] md:left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#4CAAF5] opacity-0 transition-opacity peer-checked:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </div>
            <p class="ml-3 text-sm md:hidden">{{ item.label }}</p>
          </label>
        </li>
      </ul>
    </div>
  </div>
  <div class="flex w-full my-[40px]">
    <button 
      class="m-auto rounded-[20px] min-w-[100%] md:min-w-[352px] min-h-[40px] text-white enabled:bg-gradient-to-r from-[#4CAAF5] to-[#28B4BE]  disabled:bg-[#F5F5F5] disabled:text-[#D9D9D9] disabled:border disabled:border-[#D9D9D9] disabled:cursor-not-allowed"
      :disabled="qaList.some((el)=>!el.ans) || !loginState.projectCode"
      @click="onSubmit"
    >
      送出
    </button>
  </div>
  <Toast />
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
