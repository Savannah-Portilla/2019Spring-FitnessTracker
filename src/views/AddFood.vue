<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link" to="/MyFoods">My Food Items</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/AddFood">Add a Food Item</router-link>
          </li>
        </ul>
        </div>
        <div class="container">
            <form @submit.prevent="submit">
              <br>

              <div class="form-group row">
                <label for="name" class="col-3 col-form-label">Name</label>
                <div class="col-9">
                <input type="text" v-model="data.name"
                    class="form-control"
                    name="name"
                    id="name"
                    aria-describedby="helpname"
                    placeholder="Food Name"
                    required>
                  <small id="helpname" class="form-text text-muted">Add the name of the Fod Item</small>
                </div>
                </div>

            <div class="form-group row">
          <label for="portion" class="col-3 col-form-label">Portion Size</label>
          <div class="col-9">
          <input type="text" v-model="data.portion"
                    class="form-control"
                    name="portion"
                    id="portion"
                    aria-describedby="helpportion"
                    placeholder="portion"
                    required>
                  <small id="helpportion" class="form-text text-muted">Describe the portion size however you'd like to.</small>
          </div>
          </div>
            
        
          
          <div class="form-group row">
          <label for="calorie_amount" class="col-3 col-form-label">Calorie Amount</label>
          <div class="col-9">
          <input type="text" v-model="data.calorie_amount"
                    class="form-control"
                    name="calorie_amount"
                    id="calorie_amount"
                    aria-describedby="helpcalorie_amount"
                    placeholder="calorie_amount"
                    required>
                  <small id="helpcalorie_amount" class="form-text text-muted">How many calories are in this portion?</small>
          </div>
          </div>
          

          <br>

         <div class="form-group row">
          <div class="offset-3 col-9">
          <button type="submit" class="btn btn-primary">Submit</button>
          </div>
          </div>
          </form>
          </div>
          </div>
          </div>
          </div>
          

</template>

<script>
import { Globals } from '@/models/api';
import { addFood } from '@/models/Food_Items';
import toastr from 'toastr';
export default {
  data: () => ({
    data: {},
    newFood: null,
  }),
  methods: {
    async submit() {
      try {
        const m = await addFood(this.data);
        this.newFood = m;
        toastr.success("You've Successfully added the Food Item!");
      } catch (error) {
        Globals.errors.push(error);
        toastr.error(error.message);
      }
    },
  },
};
</script>

<style>
</style>
