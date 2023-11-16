import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'        
import Badge from 'primevue/badge'
import Dropdown from 'primevue/dropdown'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

import App from './App.vue'
import router from './router'

import './style.css'
import './layout.css'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App)

app.use(PrimeVue)
// app.use(PrimeVue, { ripple: true , unstyled: true, pt: Tailwind })
app.use(ToastService)
app.use(router)

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Badge', Badge)
app.component('Dropdown', Dropdown)
app.component('Toast', Toast)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('InputText', InputText)

app.mount('#app')
