<template>
<div class="row">
    <div class="col-lg-6">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link " href="/Register">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/Login">Login</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Login</h4>
        <div class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" v-model="data.email"
                    class="form-control" name="email" id="email" aria-describedby="helpEmail" placeholder="Email">
                  <small id="helpEmail" class="form-text text-muted">You can use any email that you've use on our site</small>
                </div>
                <div class="form-group">
                  <label for="Password">Password</label>
                  <input type="password" v-model="data.password"
                    class="form-control" name="password" id="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
      </div>
    </div>
    </div>
</div>
</template>

<script>
import { Globals } from "@/models/api";
import { Login } from "@/models/Users";
import toastr from 'toastr';
//import 'toastr/build/toastr.css';

export default {
    data: ()=> ({
        data: {},
        newUser: null
    }),
    methods: {
        async submit() {
            try {
              const m = await Login(this.data);
              this.newUser = m;
              Globals.user = m.user;
              Globals.token = m.token;
              //this.$router.push(Globals.redirectRoute)
              toastr.success("You've logged in successfully!")
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