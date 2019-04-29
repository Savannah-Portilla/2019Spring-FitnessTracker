<template>
    <div class="card-body">
      <h2 class="card-title">{{Globals.user.f_name}}'s Profile</h2>
      <div class="card-text">
          <div class="row">
            <div class="col col-lg-2">First Name:</div>
            <div class="col-md-auto">
              <div
                class="control-label"
              >{{Globals.user.f_name}}</div>
            </div>
          </div>
          <div class="row">
            <div class="col col-lg-2">Last Name:</div>
            <div class="col-md-auto">
              <div
                class="card-text"
                 >{{Globals.user.l_name}}</div>
            </div>
          </div>
          <div class="row">
            <div class="col col-lg-2">Birthday:</div>
            <div class="col-md-auto">
              <div
                class="card-text"
                 >{{Globals.user.birthday}}</div>
            </div>
          </div>
          <div class="row">
            <div class="col col-lg-2">Weight:</div>
            <div class="col-md-auto">
              <div
                class="card-text"
                >{{Globals.user.weight}}</div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { Globals } from "@/models/api";
import { get } from "@/models/Users";
import toastr from "toastr";
export default {
  data: () => ({
    Globals: Globals,
    users: {},
  }),
  async mounted() {
    let data = Globals.user.email;
    this.users = await get({ email: data });
  }
};
</script>

<style>
</style>