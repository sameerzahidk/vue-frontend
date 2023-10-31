<template>
    <div>
      <h2>Add Employee</h2>
      <form @submit.prevent="addEmployee" class="form">
        <div class="row">
            <div class="col-md-6 mb-2">
                <div class="form-group">
        <label class="form-label" for="first_name">First Name:</label>
        <input class="form-control" v-model="employee.first_name" type="text" id="first_name" required />
                </div>
    </div>
    <div class="col-md-6 mb-2">
<div class="form-group">
        <label class="form-label" for="last_name">Last Name:</label>
        <input class="form-control" v-model="employee.last_name" type="text" id="last_name" required />
        </div>
    </div>
    <div class="col-md-6 mb-2">
<div class="form-group">
        <label class="form-label" for="company">Company:</label>
        <select class="form-control" v-model="employee.company_id" id="company">
          <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
        </select>
        </div>
    </div>
    <div class="col-md-6 mb-2">
        <div class="form-group">
        
        <label class="form-label" for="email">Email:</label>
        <input class="form-control" v-model="employee.email" type="email" id="email" />
    </div>
    </div>
    <div class="col-md-6 mb-2">
        <div class="form-group">
        <label class="form-label" for="phone">Phone:</label>
        <input class="form-control" v-model="employee.phone" type="text" id="phone" />
    </div>
    </div>
    </div>
    <hr>
        <button type="submit" class="btn btn-primary">Add Employee</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import "bootstrap/dist/css/bootstrap.min.css";
  export default {
    data() {
      return {
        employee: {
          first_name: "",
          last_name: "",
          company_id: null,
          email: "",
          phone: "",
        },
        companies: [], // You'll need to fetch the companies from the API
      };
    },
    mounted() {
    this.fetchCompanies(); // Fetch companies when the component is mounted
  },
    methods: {
        fetchCompanies() {
      axios.get("http://127.0.0.1:8000/api/companies").then((response) => {
        this.companies = response.data;
      });
    },
      addEmployee() {
        axios
          .post("http://127.0.0.1:8000/api/employees", this.employee)
          .then((response) => {
            console.log("Employee added:", response.data);
            // Redirect to a success page or update data as needed
          })
          .catch((error) => {
            console.error("Error adding employee:", error.response.data);
            // Handle error and validation messages
          });
      },
    },
  };
  </script>
  