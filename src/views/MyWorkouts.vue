<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-black bg-light">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/MyWorkouts"> My Workouts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/AddWorkout">Add a Workout</router-link>
          </li>
        </ul>
        <div>
          <h1> My Workouts</h1>
              <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">Date/Time</th>
                <th scope="col">Calories Burned</th>
                <th scope="col">Workout Minutes</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="Workout in Workouts" :key="Workout.ID">
                  <th scope="row">{{Workout.date_time}}</th>
                   <td>{{Workout.calories_burned}}</td>
                  <td>{{Workout.workout_minutes}}</td>
                  <td>{{Workout.description}}</td>
                  <td><button @click="deleteWorkout(Workout.ID)" class="btn btn-primary">Delete</button></td>
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
import { getWorkouts, deleteWorkout } from '@/models/Workouts.js';
import toastr from 'toastr'

export default {
  data: () => ({
    Globals: Globals,
    Workouts: [],
  }),
  async mounted() {
    this.Workouts = await getWorkouts();
  },
  methods: {
    async deleteWorkout(data) {
      console.log(data);
      try {
        await deleteWorkout({ ID: data });
        toastr.success("You've successfully deleted this workout!")
      } catch (error) {
        Globals.error.push(error);
        toastr.error(error.message);
      }

    }
  }
};
</script>

<style>
.table .thead-light th {
 
  color: #ffffff;
 
  background-color: #406BFF;
}
</style>
