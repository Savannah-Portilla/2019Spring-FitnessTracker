import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyFriends from "./views/MyFriends.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import { Globals } from '@/models/api';
import MyExercises from './views/MyExercises.vue';
import AddExercise from './views/AddExercise.vue';

Vue.use(Router)

// function guard(to, from, next){

// }

/*const router = new Router({*/
  export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/MyFriends',
      name: 'my-friends',
      component: MyFriends
    },
    {
      path: '/Register',
      name: 'register',
      component: Register
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/MyExercises',
      name: 'My Exercises',
      component: MyExercises
    },
    {
      path: '/AddExercise',
      name: 'Add Exercise',
      component: AddExercise
    }, 
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
/*router.beforeEach((to, from, next) =>{
  const publicRoutes = ['home', 'login', 'register', 'my-exercises'];
  if(!publicRoutes.includes( to.name ) && !Globals.User){
    Globals.redirectRoute = { name: to.name, path: to.path, params: to.params, query: to.query, hash: to.hash  }
    return next('login');
  }
  next(); // if you dont call next the server is going to think you are still doing an action
})

export default router;*/
