<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-black bg-light">
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
            <thead class="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Body Focus</th>
                <th scope="col">Exercises</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="Routine in Routines" :key="Routine.ID">
                  <th scope="row">{{Routine.name}}</th>
                  <td>{{Routine.body_focus}}</td>
                   <td>{{Routine.exercises}}</td>
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
import toastr from 'toastr'

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
.table .thead-light th {
 
  color: #ffffff;
 
  background-color: #406BFF;
}

</style>
