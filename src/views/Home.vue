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
<a href="http://localhost:8080/About" class="btn btn-primary">My Profile</a>
</div>
</div>

<!-- Card 1 -->
<div class="card text-center">
<div class="card-header">My Hops</div>
<img alt="Hops Icon" src="../assets/hopsicon.png" height="220">
<div class="card-body">
<p class="card-text">Click here to see your Workouts, Routines and Exercises.</p>
<a href="http://localhost:8080/MyWorkouts" class="btn btn-primary">My Workouts</a>
<br>
<br>
<a href="http://localhost:8080/MyRoutines" class="btn btn-primary">My Routines</a>
<br>
<br>
<a href="http://localhost:8080/MyExercises" class="btn btn-primary">My Exercises</a>
</div>
</div>

<!-- Card 2 -->
<div class="card text-center">
<div class="card-header">My Carrots</div>
<img alt="Carrot Icon" src="../assets/carroticon.png" height="220">
<div class="card-body">
<p class="card-text">This will take you to your Daily Foods List and your Food Items.</p>
<a href="http://localhost:8080/MyDailyFoods" class="btn btn-primary">My Food Log</a>
<br>
<br>
<a href="http://localhost:8080/MyFoods" class="btn btn-primary">My Food Items</a>
</div>
</div>

<!-- Card 3 -->
<div class="card text-center">
<div class="card-header">My Friends</div>
<img alt="Friends Icon" src="../assets/friendsicon.png" height="240">
<div class="card-body">
<p class="card-text">See all of your friends!</p>
<a href="http://localhost:8080/MyFriends" class="btn btn-primary">My Friends</a>
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
