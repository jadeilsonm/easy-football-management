import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from "jwt-decode";
import HomeView from '../views/HomeView.vue'
import ManagerCreated from '@/views/ManagerCreated.vue'
import LoginView from '../views/LoginView.vue'
import PlayersComponent from '../components/TeamComponent.vue'
// import SubscribedComponent from '../components/SubscribedComponent.vue'
import SearchComponent from '../components/SearchComponent.vue'
import StatisticPlayersComponent from '@/components/StatisticPlayersComponent.vue'
import EditPlayersComponent from '@/components/EditPlayersComponent.vue'
import RegisterView from '@/views/RegisterView.vue'
import ManagerProfile from '@/views/ManagerProfile.vue'
import ChampionShipComponent from '@/components/ChampionShipComponent.vue'
// import CopaView from '@/views/ChampionsShipsView.vue'
import ChampionsShipsView from '@/views/ChampionsShipsView.vue'
// import CupView from '@/views/CupView.vue'
// import LeagueComponent from '@/views/LeagueView.vue'
// import RoundMatchesView from '@/views/RoundMatchesView.vue'
// import MatchResultView from '@/views/MatchResultView.vue'
// import { PiniaStore } from '@/stores'
// import { onAuthStateChanged } from 'firebase/auth'
// import { getAuth } from 'firebase/auth'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: AboutView
    },
    {
      path: '/manager/created',
      name: 'manager/created',
      component: ManagerCreated,
      // meta: { requiresAuth: true }
    },
    {
      path: '/manager',
      name: 'manager',
      component: ChampionsShipsView,
      // meta: { requiresAuth: true }
    },
    // {
    //   path: '/manager/cup/:id',
    //   name: 'manager/cup',
    //   component: CupView,
    //   // meta: { requiresAuth: true }
    // },
    // {
    //   path: '/manager/league/:id',
    //   name: 'manager/league',
    //   component: LeagueComponent,
    //   // meta: { requiresAuth: true }
    // },
    // {
    //   path: '/manager/league/matches/:id',
    //   name: '/manager/league/matches',
    //   component: RoundMatchesView,
    //   // meta: { requiresAuth: true }
    // },
    // {
    //   path: '/manager/matches/result/:championshipID/round/:numberRound/match/:numberMatch',
    //   name: '/manager/matches/result/round',
    //   component: MatchResultView,
    //   // meta: { requiresAuth: true }
    // },
    {
      path: '/manager/Profile',
      name: 'manager/Profile',
      component: ManagerProfile,
      // meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      // meta: { requiresAuth: true },
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
      //   { path: 'subscribed', name: 'subscribed', component: SubscribedComponent },
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
    // {
    //   path: '/copa',
    //   name: 'copa',
    //   component: CopaView,
    //   // meta: { requiresAuth: true }
    // }
  ]
})

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (!token || isTokenExpired(token)) {
      return next({ name: 'Login' });
    }
  }

  next();
});

export default router
