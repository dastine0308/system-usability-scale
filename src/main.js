import { createApp } from 'vue'
import { createPinia } from 'pinia'
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
import Tailwind from 'primevue/passthrough/tailwind'

import App from './App.vue'
import Router from './router'
import User from './plugins/user'

import './assets/style/vendors/tailwind.css'
import './assets/style/layout.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())

app.use(PrimeVue, { ripple: true, pt: Tailwind })
app.use(ToastService)
app.use(Router)
app.use(User)

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
