<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center">Login</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <input v-model="email" class="form-control" placeholder="Email" />
              </div>
              <div class="mb-3">
                <input v-model="password" type="password" class="form-control" placeholder="Password" />
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
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "../router.js";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data.message);
          // Store authentication flag in local storage
          localStorage.setItem('user', 'authenticated');
          router.push({ name: 'Dashboard' });
          // Handle successful login
        })
        .catch((error) => {
          console.error(error.response.data.message);
          // Handle login error
        });
    },
  },
};
</script>

  