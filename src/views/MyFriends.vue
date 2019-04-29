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
            <tr v-for="user in users" :key="user.ID">
              <th scope="row">{{user.f_name}}</th>
              <td>{{user.l_name}}</td>
              <td><button @click="addFriend(user.id)" class="btn btn-primary">Add Friend</button></td>
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
export default {
  data: () => ({
    Globals: Globals,
    users: [],
  }),
  async mounted() {
    this.users = await getAll();
  },
  methods: {
   
    },
};
</script>

<style>
</style>