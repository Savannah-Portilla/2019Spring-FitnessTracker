<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/MyRoutines"> My Routines</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/AddRoutine">Add a Routine</router-link>
          </li>
        </ul>
        <div>
          <h1> My Routines</h1>
              <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Exercises</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="Routine in Routines" :key="Routine.ID">
                  <th scope="row">{{Routine.RoutineName}}</th>
                   <td>{{Routine.defaultExercises}}</td>
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
import { getRoutine } from '@/models/Routines.js';
export default {
  data: () => ({
    Globals: Globals,
    Routines: [],
  }),
  async mounted() {
    this.Routines = await getRoutine();
  },
};
</script>

<style>
</style>
