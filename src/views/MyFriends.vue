<template>
<div>
  <div class="row">
    <div class="col-lg-12">
      <div class="card text-center">
        <div class="card-header text-white bg-dark">
          <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link active" to="/MyFriends">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Myfriends">My Friends</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Pending">Pending Requests</router-link>
          </li>
        </ul>
        <br>
        <div class="active-cyan-3 active-cyan-4 mb-4">
        <vue-bootstrap-typeahead placeholder="Search" v-model="query" :data="['Erik', 'Mike', 'Savannah', 'sal', 'peter', 'Aria']"/>
      </div>
        <div>
        <h1>Users</h1>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="User in Users" :key="User.ID">
              <th scope="row">{{User.f_name}}</th>
              <td>{{User.l_name}}</td>
              <td><button @click="addFriend(User.ID)" class="btn btn-primary">Add Friend</button></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { getAll } from '@/models/Users';
import toastr from 'toastr';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
export default {
  components: {
        VueBootstrapTypeahead
    },
  data: () => ({
    Globals: Globals,
    Users: [],
  }),
  async mounted() {
    this.Users = await getAll();
  },
  methods: {
   
    },
};
</script>

<style>
</style>