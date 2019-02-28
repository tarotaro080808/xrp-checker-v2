import Vue from 'vue'

import SideBar from '@/components/atoms/template/SidebarPlugin'
import Notify from '@/components/atoms/template/NotificationPlugin'

// css assets
import '@/assets/sass/black-dashboard.scss'
import '@/assets/css/nucleo-icons.css'
import '@/assets/demo/demo.css'

Vue.use(SideBar)
Vue.use(Notify)
