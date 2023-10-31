<template>
    <div>
      <h2 class="mb-4">Add Company</h2>
      <form @submit.prevent="addCompany" class="needs-validation" novalidate>
        <div class="row">
            <div class="col-md-6 mb-2">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input v-model="company.name" type="text" class="form-control" id="name" required />
          <div class="invalid-feedback">Name is required.</div>
        </div>
    </div>
    <div class="col-md-6 mb-2">
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input v-model="company.email" type="email" class="form-control" id="email" />
        </div>
    </div>
    <div class="col-md-6 mb-2">
        <div class="mb-3">
          <label for="logo" class="form-label">Logo:</label>
          <input type="file" ref="logo" accept="image/*" class="form-control" @change="handleLogoChange" />
        </div>
    </div>
    <div class="col-md-6 mb-2">
        <div class="mb-3">
          <label for="website" class="form-label">Website:</label>
          <input v-model="company.website" type="text" class="form-control" id="website" />
        </div>
    </div>
  </div>
    <hr>
        <button type="submit" class="btn btn-primary">Add Company</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import axios from "axios";
  import "bootstrap/dist/css/bootstrap.min.css";
  export default {
    data() {
      return {
        company: {
          name: "",
          email: "",
          logo: null,
          website: "",
        },
      };
    },
    methods: {
      addCompany() {
        let formData = new FormData();
        formData.append("name", this.company.name);
        formData.append("email", this.company.email);
        formData.append("logo", this.company.logo);
        formData.append("website", this.company.website);
       
        axios
          .post("http://127.0.0.1:8000/api/companies", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Company added:", response.data);
            // Redirect to a success page or update data as needed
          })
          .catch((error) => {
            console.error("Error adding company:", error.response.data);
            // Handle error and validation messages
          });
      },
      handleLogoChange(event) {
        this.company.logo = event.target.files[0];
      },
    },
  };
  </script>
  