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
            <router-link class="nav-link active" to="/AddExercises">Add an Exercise</router-link>
          </li>
        </ul>
        </div>
          <div class="container">
          <form action="/html/tags/html_form_tag_action.cfm">
         </form>
         <br>
         <div class="form-group row">
          <label for="name" class="col-3 col-form-label">Name</label>
          <div class="col-9">
          <input type="text" class="form-control" id="reps" name="name">
          </div>
          </div>
          <fieldset class="form-group">
          <div class="row">
          <legend class="col-form-label col-3">Body Focus</legend>
          <div class="col-9">
          <div class="form-check">
          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="legendRadio" id="legendRadio1" value="1">
          Arms
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="legendRadio" id="legendRadio2" value="2" checked>
          Legs
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="legendRadio" id="legendRadio3" value="3">
          Chest
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="legendRadio" id="legendRadio3" value="3">
          Back
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="legendRadio" id="legendRadio3" value="3">
          Core
          </label>
          </div>
          <div class="form-check">
          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="legendRadio" id="legendRadio3" value="3">
          Cardio
          </label>
          </div>
          </div>
          </div>
          </fieldset>

          <div class="form-group row">
          <label for="reps" class="col-3 col-form-label">Reps</label>
          <div class="col-9">
          <input type="text" class="form-control" id="reps" name="reps">
          </div>
          </div>
          <div class="form-group row">
          <label for="sets" class="col-3 col-form-label">Sets</label>
          <div class="col-9">
          <input type="text" class="form-control" id="sets" name="sets">
          <br>
         <div class="form-group row">
          <div class="offset-3 col-9">
          <button type="submit" class="btn btn-primary">Submit</button>
          </div>
          </div>
          </div>
          </div>
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
