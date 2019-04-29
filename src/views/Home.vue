<template>
  <div class="home">
    <div class="jumbotron">
      <h1 align="center">Welcome to Hops!</h1>
      <br>

  <div class="card-group">

<div class="card text-center">
<div class="card-header">My Profile</div>
<img alt="Hops Icon" src="../assets/hopslogo1.png" height="220">
<div class="card-body">
<p class="card-text">Click here to see your profile information.</p>
<button class="nav-item ">
  <router-link class="nav-link" to="/About" active-class="active" 
      exact>My Profile <span class="sr-only">(current)</span></router-link>
</button>
</div>
</div>

<!-- Card 1 -->
<div class="card text-center">
<div class="card-header">My Hops</div>
<img alt="Hops Icon" src="../assets/hopsicon.png" height="220">
<div class="card-body">
<p class="card-text">Click here to see your Workouts, Routines and Exercises.</p>
<button class="nav-item ">
  <router-link class="nav-link" to="/MyWorkouts" active-class="active" 
      exact>My Workouts <span class="sr-only">(current)</span></router-link>
</button>
<br>
<br>
<button class="nav-item ">
  <router-link class="nav-link" to="/MyRoutines" active-class="active" 
      exact>My Routines <span class="sr-only">(current)</span></router-link>
</button>
<br>
<br>
<button class="nav-item ">
  <router-link class="nav-link" to="/MyExercises" active-class="active" 
      exact>My Exercises <span class="sr-only">(current)</span></router-link>
</button>
</div>
</div>

<!-- Card 2 -->
<div class="card text-center">
<div class="card-header">My Carrots</div>
<img alt="Carrot Icon" src="../assets/carroticon.png" height="220">
<div class="card-body">
<p class="card-text">This will take you to your Daily Foods List and your Food Items.</p>
<button class="nav-item ">
  <router-link class="nav-link" to="/MyDailyFoods" active-class="active" 
      exact>My Food Log <span class="sr-only">(current)</span></router-link>
</button>
<br>
<br>
<button class="nav-item ">
  <router-link class="nav-link" to="/MyFoods" active-class="active" 
      exact>My Food Items <span class="sr-only">(current)</span></router-link>
</button>
</div>
</div>

<!-- Card 3 -->
<div class="card text-center">
<div class="card-header">My Friends</div>
<img alt="Friends Icon" src="../assets/friendsicon.png" height="240">
<div class="card-body">
<p class="card-text">See all of your friends!</p>
<button class="nav-item ">
  <router-link class="nav-link" to="/MyFriends" active-class="active" 
      exact>My Friends <span class="sr-only">(current)</span></router-link>
</button>
</div>
</div>

</div>

    </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  }
}
</script>
