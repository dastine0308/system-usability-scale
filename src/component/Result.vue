<script setup>
import { useRouter } from'vue-router'
import { reactive, ref } from 'vue'

const score = ref(0)
score.value = parseInt(sessionStorage.getItem('score'))

const resultGroup = reactive({
  susScore: {
    title: 'SUS Score',
    value: '',
    color: '#333333'
  },
  grade: {
    title: 'Grade',
    value: '',
    color: '#333333'
  },
  nps: {
    title: 'NPS',
    value: '',
    color: '#333333'
  },
  acceptable: {
    title: 'Acceptable',
    value: '',
    color: '#333333'
  },
  adjective: {
    title: 'Adjective',
    value: '',
    color: '#333333'
  },
})

const getGrade = () => {
  switch(true) {
    case (score.value > 78.8 && score.value <= 100):
      return 'A'
    case (score.value > 72.5 && score.value <= 78.8):
      return 'B'
    case (score.value > 62.6 && score.value <= 72.5):
      return 'C'
    case (score.value > 51.6 && score.value <= 62.6):
      return 'D'
    default:
      return 'F'
  }
}

const getNPS = () => {
  switch(true) {
    case (score.value > 78.8 && score.value <= 100):
      return {
        text: 'Promoter',
        color: '#66B743'
      }
    case (score.value > 62.7 && score.value <= 78.8):
      return {
        text: 'Passive',
        color: '#EFBB0E'
      }
    default:
      return {
        text: 'Detractor',
        color: '#FF7726'
      }
  }
}

const getAcceptable = () => {
  switch(true) {
    case (score.value > 71 && score.value <= 100):
      return {
        text: 'Acceptable',
        color: '#66B743'
      }
    case (score.value > 51.5 && score.value <= 71):
      return {
        text: 'Marginal',
        color: '#EFBB0E'
      }
    default:
      return {
        text: 'Not Acceptable',
        color: '#FF7726'
      }
  }
}

const getAdjective = () => {
  switch(true) {
    case (score.value > 84 && score.value <= 100):
      return {
        text: 'Best Imaginable',
        color: '#66B743'
      }
    case (score.value > 80.7 && score.value <= 84):
      return {
        text: 'Excellent',
        color: '#66B743'
      }
    case (score.value > 71 && score.value <= 80.7):
      return {
        text: 'Good',
        color: '#66B743'
      }
    case (score.value > 51.5 && score.value <= 71):
      return {
        text: 'OK',
        color: '#EFBB0E'
      }
    case (score.value > 24.9 && score.value <= 51.5):
      return {
        text: 'Poor',
        color: '#FF7726'
      }
    default:
      return {
        text: 'Worst Imaginable',
        color: '#FF7726'
      }
  }
}

Object.keys(resultGroup).forEach(key => {
  switch(key) {
    case 'susScore':
      resultGroup[key].value = score.value
      break
    case 'grade':
      resultGroup[key].value = getGrade()
      break
    case 'nps':
      resultGroup[key].value = getNPS().text
      resultGroup[key].color = getNPS().color
      break
    case 'acceptable':
      resultGroup[key].value = getAcceptable().text
      resultGroup[key].color = getAcceptable().color
      break
    case 'adjective':
      resultGroup[key].value = getAdjective().text
      resultGroup[key].color = getAdjective().color
      break
    default:
      break
  }
})

const router = useRouter()
const handleBack = () => {
  router.back('/')
}
</script>

<template>
  <div>
    <p class="font-semibold">使用李克特五分量表，非常不同意：1分、不同意：2分、普通/不知道：3分、同意：4分、非常同意：5分，共十題，奇數題為正向題，偶數題爲負向題，所以計算的時候，正向負向的計算方式會不一樣。</p>
    <ul class="my-[40px]">
      <li class="grid grid-cols-2 gap-[16px] my-[8px]" v-for="obj in resultGroup" :key="obj.key">
        <p class="basis-1/2 text-right font-semibold">{{ obj.title }}</p>
        <p class="basis-1/2" :style="{'color': obj.color}">{{ obj.value }}</p>
      </li>
    </ul>
    <div class="bg-center bg-no-repeat bg-cover bg-[url('@/assets/sus-scale-adj.jpg')] min-h-[274px]" />
  </div>
  <div class="flex w-[100%] mt-[40px]">
    <button 
      class="m-auto rounded-[20px] min-w-[100%] md:min-w-[352px] min-h-[40px] text-white enabled:bg-gradient-to-r from-[#4CAAF5] to-[#28B4BE]  disabled:bg-[#F5F5F5] disabled:text-[#D9D9D9] disabled:border disabled:border-[#D9D9D9]"
      @click="handleBack"
    >
      返回
    </button>
  </div>
</template>

<style>

</style>
