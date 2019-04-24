<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link class="navbar-brand" to="/" >
            <img alt="Vue logo" src="../assets/hopslogo1.png" height="40">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item ">
                    <router-link class="nav-link" to="/" active-class="active" exact>Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/About" active-class="active">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/MyFriends">My Friends</router-link>
                </li>
                <li class="nav-item ">
                    <router-link class="nav-link" to="/MyWorkouts" active-class="active" exact>My Workouts <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item ">
                    <router-link class="nav-link" to="/MyRoutines" active-class="active" exact>My Routines <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item ">
                    <router-link class="nav-link" to="/MyExercises" active-class="active" exact>My Exercises <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item ">
                    <router-link class="nav-link" to="/MyDailyFoods" active-class="active" exact>My Food Log <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item ">
                    <router-link class="nav-link" to="/MyFoods" active-class="active" exact>My Food Items <span class="sr-only">(current)</span></router-link>
                </li>
            </ul>
            <form class="form-inline mt-2 mt-md-0" v-if="!Globals.user">
                <router-link to="/Login" class="nav-link">Login</router-link>
                <router-link to="/Register" class="nav-link">Sign Up</router-link>
            </form>
            <span class="navbar-text" v-if="Globals.User">Welcome {{Globals.User.f_name}} {{Globals.User.l_name}}</span>
        </div>
    </nav>
</template>

<script>
import { Globals } from "@/models/api";
export default {
    data: ()=>({
        Globals: Globals
    }),
    methods: {
    
        }
    }

</script>

<style>

</style>
