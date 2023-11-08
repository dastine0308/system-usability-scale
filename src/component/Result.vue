<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { getResultById, useLoadResults } from '@/firebase'

const score = ref(0)

const resultGroup = reactive({
  susScore: {
    title: 'SUS Score',
    value: '',
    color: '#333333',
  },
  grade: {
    title: 'Grade',
    value: '',
    color: '#333333',
  },
  nps: {
    title: 'NPS',
    value: '',
    color: '#333333',
  },
  acceptable: {
    title: 'Acceptable',
    value: '',
    color: '#333333',
  },
  adjective: {
    title: 'Adjective',
    value: '',
    color: '#333333',
  },
})

const getGrade = score => {
  switch (true) {
    case score > 78.8 && score <= 100:
      return 'A'
    case score > 72.5 && score <= 78.8:
      return 'B'
    case score > 62.6 && score <= 72.5:
      return 'C'
    case score > 51.6 && score <= 62.6:
      return 'D'
    default:
      return 'F'
  }
}

const getNPS = score => {
  switch (true) {
    case score > 78.8 && score <= 100:
      return {
        text: 'Promoter',
        color: '#66B743',
      }
    case score > 62.7 && score <= 78.8:
      return {
        text: 'Passive',
        color: '#EFBB0E',
      }
    default:
      return {
        text: 'Detractor',
        color: '#FF7726',
      }
  }
}

const getAcceptable = score => {
  switch (true) {
    case score > 71 && score <= 100:
      return {
        text: 'Acceptable',
        color: '#66B743',
      }
    case score > 51.5 && score <= 71:
      return {
        text: 'Marginal',
        color: '#EFBB0E',
      }
    default:
      return {
        text: 'Not Acceptable',
        color: '#FF7726',
      }
  }
}

const getAdjective = score => {
  switch (true) {
    case score > 84 && score <= 100:
      return {
        text: 'Best Imaginable',
        color: '#66B743',
      }
    case score > 80.7 && score <= 84:
      return {
        text: 'Excellent',
        color: '#66B743',
      }
    case score > 71 && score <= 80.7:
      return {
        text: 'Good',
        color: '#66B743',
      }
    case score > 51.5 && score <= 71:
      return {
        text: 'OK',
        color: '#EFBB0E',
      }
    case score > 24.9 && score <= 51.5:
      return {
        text: 'Poor',
        color: '#FF7726',
      }
    default:
      return {
        text: 'Worst Imaginable',
        color: '#FF7726',
      }
  }
}

const fetchResultDetail = async () => {
  const docId = sessionStorage.getItem('docId')
  const resp = await getResultById(docId)
  score.value = resp.score
  Object.keys(resultGroup).forEach(key => {
    switch (key) {
      case 'susScore':
        resultGroup[key].value = score.value
        break
      case 'grade':
        resultGroup[key].value = getGrade(score.value)
        break
      case 'nps':
        resultGroup[key].value = getNPS(score.value).text
        resultGroup[key].color = getNPS(score.value).color
        break
      case 'acceptable':
        resultGroup[key].value = getAcceptable(score.value).text
        resultGroup[key].color = getAcceptable(score.value).color
        break
      case 'adjective':
        resultGroup[key].value = getAdjective(score.value).text
        resultGroup[key].color = getAdjective(score.value).color
        break
      default:
        break
    }
  })
}

onMounted(async () => {
  await fetchResultDetail()
  const results = await useLoadResults()
  console.log(results)
})

const router = useRouter()
const handleBack = () => {
  sessionStorage.clear()
  router.back('/')
}
</script>

<template>
  <div class="p-[1.5rem]">
    <p class="font-semibold">
      使用李克特五分量表，非常不同意：1分、不同意：2分、普通/不知道：3分、同意：4分、非常同意：5分，共十題，奇數題為正向題，偶數題爲負向題，所以計算的時候，正向負向的計算方式會不一樣。
    </p>
    <ul class="my-[40px]">
      <li class="grid grid-cols-2 gap-[16px] my-[8px]" v-for="obj in resultGroup" :key="obj.key">
        <p class="basis-1/2 text-right font-semibold">{{ obj.title }}</p>
        <p class="basis-1/2" :style="{ color: obj.color }">{{ obj.value }}</p>
      </li>
    </ul>
    <div
      class="flex m-auto bg-center bg-no-repeat bg-cover bg-[url('@/assets/sus-scale-adj.jpg')] max-w-[815px] min-h-[274px]"
    />
  </div>
  <div class="flex w-[80%] md:w-[100%] my-[40px]">
    <button
      class="m-auto rounded-[20px] min-w-[100%] md:min-w-[352px] min-h-[40px] text-white enabled:bg-gradient-to-r from-[#4CAAF5] to-[#28B4BE] disabled:bg-[#F5F5F5] disabled:text-[#D9D9D9] disabled:border disabled:border-[#D9D9D9]"
      @click="handleBack"
    >
      返回
    </button>
  </div>
</template>

<style></style>
