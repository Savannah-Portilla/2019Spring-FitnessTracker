<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/MyExercises"> My Exercises</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Addexercises">Add an Exercise</router-link>
          </li>
        </ul>
        <div>
          <h1> My Exercises</h1>
              <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Body Focus</th>
                <th scope="col">Reps</th>
                <th scope="col">Sets</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="exercise in exercises" :key="exercise.id">
                  <th scope="row">{{exercise.exerciseName}}</th>
                   <td>{{exercise.defaultBodyFocus}}</td>
                  <td>{{exercise.defaultReps}}</td>
                  <td>{{exercise.defaultSets}}</td>
                </tr>
            </tbody>
          </table>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { getExercize } from '@/models/Exercises.js';
export default {
  data: () => ({
    Globals: Globals,
    exercises: [],
  }),
  async mounted() {
    this.exercises = await getExercize();
  },
};
</script>

<style>
</style>
