<template>
   <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/MyFoods"> My Food Items</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/AddFood">Add a Food Items</router-link>
          </li>
        </ul>
        <div>
          <h1> My Food Items</h1>
              <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Portion</th>
                <th scope="col">Calorie Amount</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="Food_Item in Food_Items" :key="Food_Item.ID">
                  <th scope="row">{{Food_Item.Food_ItemName}}</th>
                   <td>{{Food_Item.defaultPortion}}</td>
                  <td>{{Food_Item.defaultCalorieAmount}}</td>
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
import { getFood } from '@/models/Food_Items.js';
export default {
  data: () => ({
    Globals: Globals,
    Food_Items: [],
  }),
  async mounted() {
    this.Food_Items = await getFood();
  },
};
</script>

<style>
</style>
