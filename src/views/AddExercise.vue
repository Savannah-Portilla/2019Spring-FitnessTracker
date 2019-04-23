<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link" to="/Exercises">Exercises</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/AddExercise">Add an Exercise</router-link>
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
                    placeholder="Exercise Name"
                    required>
                  <small id="helpname" class="form-text text-muted">Add the name of the Exercise</small>
                </div>
                </div>

          <fieldset class="form-group">
          <div class="row">
          <legend class="col-form-label col-3">Body Focus</legend>
          <div class="col-9">
          <div class="form-check">
          <label class="form-check-label">
          <input v-model="data.body_focus" class="form-check-input" type="radio" 
                    name="body_focus"
                    id="body_focus"
                    aria-describedby="helpbody_focus"
                    placeholder="Body Focus"
                    required>
          Arms
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input v-model="data.body_focus" class="form-check-input" type="radio" 
                    name="body_focus"
                    id="body_focus"
                    aria-describedby="helpbody_focus"
                    placeholder="Body Focus"
                    required>
          Legs
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input v-model="data.body_focus" class="form-check-input" type="radio" 
                    name="body_focus"
                    id="body_focus"
                    aria-describedby="helpbody_focus"
                    placeholder="Body Focus"
                    required>
          Chest
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input v-model="data.body_focus" class="form-check-input" type="radio" 
                    name="body_focus"
                    id="body_focus"
                    aria-describedby="helpbody_focus"
                    placeholder="Body Focus"
                    required>
          Back
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input v-model="data.body_focus" class="form-check-input" type="radio" 
                    name="body_focus"
                    id="body_focus"
                    aria-describedby="helpbody_focus"
                    placeholder="Body Focus"
                    required>
          Core
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input v-model="data.body_focus" class="form-check-input" type="radio" 
                    name="body_focus"
                    id="body_focus"
                    aria-describedby="helpbody_focus"
                    placeholder="Body Focus"
                    required>
          Cardio
          </label>
          </div>
          </div>
          </div>
          </fieldset>

          <div class="form-group row">
          <label for="reps" class="col-3 col-form-label">Reps</label>
          <div class="col-9">
          <input type="text" v-model="data.reps"
                    class="form-control"
                    name="reps"
                    id="reps"
                    aria-describedby="helpreps"
                    placeholder="Reps"
                    required>
                  <small id="helpreps" class="form-text text-muted">Add the number of reps.</small>
          </div>
          </div>

          <div class="form-group row">
          <label for="sets" class="col-3 col-form-label">Sets</label>
          <div class="col-9">
          <input type="text" v-model="data.sets"
                    class="form-control"
                    name="sets"
                    id="sets"
                    aria-describedby="helpsets"
                    placeholder="Sets"
                    required>
                  <small id="helpsets" class="form-text text-muted">Add the number of sets.</small>
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
import { addExercise } from '@/models/Exercises';
import toastr from 'toastr';
export default {
  data: () => ({
    data: {},
    newExercise: null,
  }),
  methods: {
    async submit() {
      try {
        const m = await addExercise(this.data);
        this.newExercise = m;
        toastr.success("You've Successfully added the Exercise!");
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
