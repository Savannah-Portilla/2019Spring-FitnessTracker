import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyFriends from "./views/MyFriends.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import { Globals } from '@/models/api';
import MyExercises from './views/MyExercises.vue';
import AddExercise from './views/AddExercise.vue';
import MyRoutines from './views/MyRoutines.vue';
import AddRoutine from './views/AddRoutine.vue';
import MyWorkouts from './views/MyWorkouts.vue';
import AddWorkout from './views/AddWorkout.vue';
import MyFoods from './views/MyFoods.vue';
import MyDailyFoods from './views/MyDailyFoods.vue';
import AddFood from './views/AddFood.vue';
import AddFoodLog from './views/AddFoodLog.vue';
import About from './views/About.vue';

Vue.use(Router)

// function guard(to, from, next){

// }

/*const router = new Router({*/
  const router = new Router({
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
      name: 'AddExercise',
      component: AddExercise
    }, 
    {
      path: '/MyRoutines',
      name: 'MyRoutines',
      component: MyRoutines
    }, 
    {
      path: '/AddRoutine',
      name: 'AddRoutine',
      component: AddRoutine
    }, 
    {
      path: '/MyWorkouts',
      name: 'MyWorkouts',
      component: MyWorkouts
    }, 
    {
      path: '/AddWorkout',
      name: 'AddWorkout',
      component: AddWorkout
    }, 
    {
      path: '/MyFoods',
      name: 'MyFoods',
      component: MyFoods
    }, 
    {
      path: '/MyDailyFoods',
      name: 'MyDailyFoods',
      component: MyDailyFoods
    }, 
    {
      path: '/AddFood',
      name: 'AddFood',
      component: AddFood
    }, 
    {
      path: '/AddFoodLog',
      name: 'AddFoodLog',
      component: AddFoodLog
    }, 
    {
      path: '/About',
      name: 'About',
      component: About
    }

  ]
})
/* router.beforeEach((to, next) =>{
  const publicRoutes = ['login', 'register'];
  if(!publicRoutes.includes( to.name ) && !Globals.user){
    Globals.redirectRoute = { name: to.name, path: to.path, params: to.params, query: to.query, hash: to.hash  }
    return next('login');
  }
  next(); // if you dont call next the server is going to think you are still doing an action
}); */

export default router;
