<template>
<div class="row">
    <div class="col-lg-6">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link active" href="">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Single Sign in</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Register</h4>
        <div class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="f_name">First Name</label>
                  <input type="text" v-model="data.f_name"
                    class="form-control" name="f_name" id="f_name" aria-describedby="helpFirstName" placeholder="First Name">
                  <small id="helpFirstName" class="form-text text-muted">If you have a middle name you can enter that too</small>
                </div>
                <div class="form-group">
                  <label for="l_name">Last Name</label>
                  <input type="text" v-model="data.l_name"
                    class="form-control" name="l_name" id="l_name" aria-describedby="helpLastName" placeholder="Last Name">
                  <small id="helpLastName" class="form-text text-muted">Sir Name</small>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" v-model="data.password"
                    class="form-control" name="password" id="password" placeholder="Password">
                </div>
                <div class="form-group">
                  <label for="weight">Current Weight</label>
                  <input type="text" v-model="data.weight"
                    class="form-control" name="weight" id="weight" aria-describedby="helpweight" placeholder="Weight">
                  <small id="helpWeight" class="form-text text-muted">This is private information only visible to you.</small>
                </div>
                <div class="form-group">
                  <label for="weight_goal">Weight Goal</label>
                  <input type="text" v-model="data.weight_goal"
                    class="form-control" name="weight_goal" id="weight_goal" aria-describedby="helpweight_goal" placeholder="Weight Goal">
                  <small id="helpweight_goal" class="form-text text-muted">You can always update this goal later.</small>
                </div>
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <input type="text" v-model="data.email"
                    class="form-control" name="email" id="email" aria-describedby="helpemail" placeholder="email">
                  <small id="helpemail" class="form-text text-muted">Your e-mail will act as your username.</small>
                </div>
                <div class="form-group">
                  <label for="birthday">Birthday</label>
                  <input type="date" v-model="data.birthday"
                    class="form-control" name="birthday" id="birthday" aria-describedby="helpBirthday" placeholder="Your Birthday">
                  <small id="helpBirthday" class="form-text text-muted">Please include the year</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
    </div>
    <div class="col-lg-6">
      <div class="card border-success" v-if="newUser">
        <div class="card-body">
          <h4 class="card-title">Congrats! You've Registered</h4>
          <p class="card-text">
            {{newUser.f_name}} {{newUser.l_name}} 
          </p>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { Globals } from "@/models/api";
import { Register } from "@/models/Users";
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default {
    data: ()=> ({
        data: {},
        newUser: null
    }),
    methods: {
        async submit(){
            try {
              const m = await Register(this.data);
              this.newUser = m;
              toastr.success("You've registered successfully!")
            } catch (error) {
              Globals.errors.push(error);
              toastr.error(error.message);
            }
        }
    }
}
</script>

<style>
</style>
