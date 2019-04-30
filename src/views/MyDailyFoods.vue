<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-black bg-light">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/MyDailyFoods"> My Food Log</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/AddFoodLog">Add a Food Item to your Log</router-link>
          </li>
        </ul>
        <div>
          <h1> My Food Log</h1>
              <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Daily Foods</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="Daily_Food in Daily_Foods" :key="Daily_Food.ID">
                  <th scope="row">{{Daily_Food.date}}</th>
                   <td>{{Daily_Food.daily_foods}}</td>
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
import { getDailyFoods } from '@/models/Daily_Foods.js';
export default {
  data: () => ({
    Globals: Globals,
    Daily_Foods: [],
  }),
  async mounted() {
    this.Daily_Foods = await getDailyFoods();
  },
};
</script>

<style>
.table .thead-light th {
 
  color: #ffffff;
 
  background-color: #406BFF;
}
</style>
