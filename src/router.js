// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginForm.vue';
import Dashboard from './components/Dashboard.vue';
import AddEmployee from './components/AddEmployee.vue';
import AddCompany from './components/AddCompany.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Add this meta field to restrict access
  },
  {
    path: '/add-employee',
    name: 'AddEmployee',
    component: AddEmployee,
  },
  {
    path: '/add-company',
    name: 'AddCompany',
    component: AddCompany,
  },
  // Other routes
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for 'history' mode
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated, otherwise redirect to login
    if (!localStorage.getItem('user')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // Proceed to the route
  }
});

export default router;
