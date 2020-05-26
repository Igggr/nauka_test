import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {store} from './store/store.js';
import EmployeeList from './components/employeeList.vue';
import EmployeeProfile from './components/EmployeeProfile.vue';
import Error404 from './components/Error.vue';


const routes = [
  {path: '/', component: EmployeeList 
  
  ,beforeEnter(from, to, next) {
  	store.dispatch('checkUpdate');
  	next();
  },
  
},
  {path: '/profile/:id', component: EmployeeProfile},
  {path: '*', component: Error404}
];


export const router = new VueRouter({
	routes,
	mode: 'history'

});