<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { useLoadResults } from '@/api'
import moment from 'moment'

const { proxy: { $user } } = getCurrentInstance()

const results = ref()
const loading = ref(false)

const average = computed(()=> {
  if(!results.value || results.value.length === 0) return 0
  const sum = results.value.map((el)=>(el.score)).reduce((accumulator, currentValue) => (accumulator + currentValue), 0)
  return (sum / results.value.length).toFixed(2)
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
        bedgeStyle: 'bg-success',
      }
    case score > 62.7 && score <= 78.8:
      return {
        text: 'Passive',
        bedgeStyle: 'bg-info',
      }
    default:
      return {
        text: 'Detractor',
        bedgeStyle: 'bg-warning',
      }
  }
}

const getAcceptable = score => {
  switch (true) {
    case score > 71 && score <= 100:
      return {
        text: 'Acceptable',
        bedgeStyle: 'bg-success',
      }
    case score > 51.5 && score <= 71:
      return {
        text: 'Marginal',
        bedgeStyle: 'bg-info',
      }
    default:
      return {
        text: 'Not Acceptable',
        bedgeStyle: 'bg-warning',
      }
  }
}

const getAdjective = score => {
  switch (true) {
    case score > 84 && score <= 100:
      return {
        text: 'Best Imaginable',
        bedgeStyle: 'bg-success',
      }
    case score > 80.7 && score <= 84:
      return {
        text: 'Excellent',
        bedgeStyle: 'bg-success',
      }
    case score > 71 && score <= 80.7:
      return {
        text: 'Good',
        bedgeStyle: 'bg-success',
      }
    case score > 51.5 && score <= 71:
      return {
        text: 'OK',
        bedgeStyle: 'bg-info',
      }
    case score > 24.9 && score <= 51.5:
      return {
        text: 'Poor',
        bedgeStyle: 'bg-warning',
      }
    default:
      return {
        text: 'Worst Imaginable',
        bedgeStyle: 'bg-warning',
      }
  }
}

// API:
const fetchResults = async (code) => {
  try {
    loading.value = true;
    const resp = await useLoadResults(code)
    if(resp) {
      results.value = resp.map((el, index)=>{
        return {
          rowIdx: index+1,
          date: moment(new Date(el?.testDate?.seconds*1000)).format('YYYY/MM/DD hh:mm'),
          nps: getNPS(el.score),
          acceptable: getAcceptable(el.score),
          adjective: getAdjective(el.score),
          grade: getGrade(el.score),
          score: el.score
        }
      })
    }
    loading.value = false;
  } catch(e) {
    console.log('Error:', e)
  }
}

onMounted(()=> {
  if($user.loginState?.projectCode) {
    fetchResults($user.loginState?.projectCode)
  }
})

const router = useRouter()
const handleBack = () => {
  router.back('/')
}
</script>

<template>
  <div class="">
    <p class="font-semibold">
      使用李克特五分量表，非常不同意：1分、不同意：2分、普通/不知道：3分、同意：4分、非常同意：5分，共十題，奇數題為正向題，偶數題爲負向題，所以計算的時候，正向負向的計算方式會不一樣。
    </p>
    <div class="my-[40px]">
      <DataTable :value="results" tableStyle="min-width: 50rem" lazzy :loading="loading">
        <Column field="rowIdx" header="編號" sortable style="width: 10%"></Column>
        <Column field="date" header="測試日期" sortable style="width: 25%"></Column>
        <Column field="nps" header="NPS">
          <template #body="{data}">
            <div class="flex items-center">
              <Badge :class="data.nps.bedgeStyle" :pt="{root: { class: 'rounded-full w-2 h-2 mr-3'}}"/>
              {{ data.nps.text }}
            </div>
          </template>
        </Column>
        <Column field="acceptable" header="Acceptable" style="width: 20%">
          <template #body="{data}">
            <div class="flex items-center">
              <Badge :class="data.acceptable.bedgeStyle" :pt="{root: { class: 'rounded-full w-2 h-2 mr-3'}}"/>
              {{ data.acceptable.text }}
            </div>
          </template>
        </Column>
        <Column field="adjective" header="Adjective" style="width: 15%">
          <template #body="{data}">
            <div class="flex items-center">
              <Badge :class="data.adjective.bedgeStyle" :pt="{root: { class: 'rounded-full w-2 h-2 mr-3'}}" />
              {{ data.adjective.text }} 
            </div>
          </template>
        </Column>
        <Column field="grade" header="Grade" style="width: 10%">
          <template #body="{data}">
            {{ data.grade }}
          </template>
        </Column>
        <Column field="score" header="SUS Score" sortable style="width: 20%" >
          <template #body="{data}">
            <p :class="{'text-danger': data.score < 68}">{{ data.score }}</p>
          </template>
        </Column>
        <ColumnGroup type="footer">
          <Row>
            <Column footer="平均:" :colspan="6" footerStyle="text-align:right" />
            <Column :footer="average" />
          </Row>
        </ColumnGroup>
      </DataTable>
    </div>
    <div
      class="flex m-auto bg-center bg-no-repeat bg-cover bg-[url('@/assets/sus-scale-adj.jpg')] max-w-[815px] min-h-[274px]"
    />
  </div>
  <div class="flex w-full my-[40px]">
    <button
      class="m-auto rounded-[20px] min-w-[100%] md:min-w-[352px] min-h-[40px] text-white enabled:bg-gradient-to-r from-[#4CAAF5] to-[#28B4BE] disabled:bg-[#F5F5F5] disabled:text-[#D9D9D9] disabled:border disabled:border-[#D9D9D9]"
      @click="handleBack"
    >
      返回
    </button>
  </div>
</template>

<style></style>
