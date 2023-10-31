<template>
    <div class="container">
      <h2 class="mt-5">Welcome Admin</h2>
      <button @click="logout" class="btn btn-danger mt-3">Logout</button>
      <hr>
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">Companies</h3>
                    <router-link to="/add-company" class="btn btn-success btn-sm">Add Company</router-link>
                  </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Logo</th>
                            <th>Website</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="company in companies" :key="company.id">
                            <td>{{ company.name }}</td>
                            <td>{{ company.email }}</td>
                            <td><img :src="company.logo_url" alt="Company Logo" height="50" width="50" /></td>
                            <td>{{ company.website }}</td>
                            <td>
                              <button @click="deleteCompany(company)" class="btn btn-danger btn-sm">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <pagination :items="companies" :page-size="10" @page-changed="fetchCompanies" />
                </div>
            </div>
      
      <br>
      <br>
    


      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h3>Employees</h3>
    <router-link to="/add-employee" class="btn btn-success btn-sm">Add Employee</router-link>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="employee in employees" :key="employee.id">
                    <td>{{ employee.first_name }}</td>
                    <td>{{ employee.last_name }}</td>
                    <td>{{ employee.company.name }}</td>
                    <td>{{ employee.email }}</td>
                    <td>{{ employee.phone }}</td>
                    <td>
                      <button @click="deleteEmployee(employee)" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <pagination :items="employees" :page-size="10" @page-changed="fetchEmployees" />
        </div>
      </div>
    
    <br>
    <br>
    
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import "bootstrap/dist/css/bootstrap.min.css";
  import Pagination from "./Pagination.vue"; 
  export default {
    components: {
    Pagination
  },
  data() {
    return {
      companies: [],
      employees: [],
      companiesPage: 1,
      employeesPage: 1
    };
  },
  mounted() {
    this.fetchCompanies();
    this.fetchEmployees();
  },
  methods: {
    deleteEmployee(employee) {
      const confirmation = window.confirm(`Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`);
      if (!confirmation) return;

      axios.delete(`http://127.0.0.1:8000/api/employees/${employee.id}`)
        .then(response => {
          console.log("Employee deleted:", response.data);
          // Refresh the employees list
          this.fetchEmployees();
        })
        .catch(error => {
          console.error("Error deleting employee:", error.response.data);
        });
    },
    deleteCompany(company) {
      const confirmation = window.confirm(`Are you sure you want to delete ${company.name}?`);
      if (!confirmation) return;

      axios.delete(`http://127.0.0.1:8000/api/companies/${company.id}`)
        .then(response => {
          console.log("Company deleted:", response.data);
          // Refresh the companies list
          this.fetchCompanies();
        })
        .catch(error => {
          console.error("Error deleting company:", error.response.data);
        });
    },
    fetchCompanies(page = 1) {
      axios.get(`http://127.0.0.1:8000/api/companies?page=${page}`).then((response) => {
        console.log(response.data);
        this.companies = response.data.data.map(company => ({
          ...company,
          logo_url: company.logo ? this.getLogoUrl(company.logo) : null,
        }));
        this.companiesPage = page;
      });
    },
    fetchEmployees(page = 1) {
      axios.get(`http://127.0.0.1:8000/api/employees?page=${page}`).then((response) => {
        console.log(response.data);
        this.employees = response.data.data;
        this.employeesPage = page;
      });
    },
    getLogoUrl(logoFileName) {
      return logoFileName ? `http://127.0.0.1:8000${logoFileName}` : null;
    },
    logout() {
      // Clear authentication flag from local storage
      localStorage.removeItem('user');
      // Redirect to login
      this.$router.push({ name: 'Login' });
    },
  },
};
  </script>
  
  <style>
  </style>
  