import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router'
import DepreciationMethodsForm from '@/components/DepreciationMethodsForm'
import ReducingBalance from '@/components/ReducingBalance'
import StraightLine from '@/components/StraightLine'
import SumYears from '@/components/SumYears'
import UnitProduction from '@/components/UnitProduction'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
Vue.router = router
export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: DepreciationMethodsForm
    },
    {
      path: '/straightline',
      name: 'straightline',
      component: StraightLine
    }
  ]
})
