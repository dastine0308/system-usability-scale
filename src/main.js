import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'        
import Badge from 'primevue/badge'
import Dropdown from 'primevue/dropdown'

import App from './App.vue'
import router from './router'

import './style.css'
import './layout.scss'
import 'primevue/resources/themes/lara-light-teal/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Badge', Badge)
app.component('Dropdown', Dropdown)

app.mount('#app')
