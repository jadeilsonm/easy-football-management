import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManagerCreated from '@/views/ManagerCreated.vue'
import LoginView from '../views/LoginView.vue'
import PlayersComponent from '../components/TeamComponent.vue'
import SubscribedComponent from '../components/SubscribedComponent.vue'
import SearchComponent from '../components/SearchComponent.vue'
import StatisticPlayersComponent from '@/components/StatisticPlayersComponent.vue'
import EditPlayersComponent from '@/components/EditPlayersComponent.vue'
import RegisterView from '@/views/RegisterView.vue'
import ManagerProfile from '@/views/ManagerProfile.vue'
import ChampionShipComponent from '@/components/ChampionShipComponent.vue'
import CopaView from '@/views/ChampionsShipsView.vue'
import ChampionsShipsView from '@/views/ChampionsShipsView.vue'
import CupView from '@/views/CupView.vue'
import LeagueComponent from '@/components/LeagueComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: HomeView
    },
    {
      path: '/manager/created',
      name: 'manager/created',
      component: ManagerCreated
    },
    {
      path: '/manager',
      name: 'manager',
      component: ChampionsShipsView
    },
    {
      path: '/manager/cup/:id',
      name: 'manager/cup',
      component: CupView
    },
    {
      path: '/manager/league/:id',
      name: 'manager/league',
      component: LeagueComponent
    },
    {
      path: '/manager/Profile',
      name: 'manager/Profile',
      component: ManagerProfile
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'team', name: 'team', component: PlayersComponent,
          children: [
            {
              path: 'editteam',
              component: EditPlayersComponent,
            },
            {
              path: 'statistics',
              component: StatisticPlayersComponent,
            }
          ]
        },
        { path: 'subscribed', name: 'subscribed', component: SubscribedComponent },
        { 
          path: 'search', name: 'search', component: SearchComponent,
        },
        {
          path: 'championship/details/:id',
          name: 'championsshipdetails',
          component: ChampionShipComponent,
        },
      ]
    },
    
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/copa',
      name: 'copa',
      component: CopaView
    }
  ]
})

export default router
