import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



let employees = [
  {"id" : 1, "name": "Anton", "surname": "Bursa", "birthdate": "1983-12-10", "job_title": "manager", "remote": false, "city": "spb", "street": "Nevskiy", "house": 124, "flat": 17 },
  {"id": 2, "name": "Pavel", "surname": "Scetov", "birthdate": "1991-12-10", "job_title": "coder", "remote": true, "city": "Moscow", "street": "Liteyniy", "house": 35, "flat": 9 }


]


export const store = new Vuex.Store({
	state: {
		employees: employees
	},
	getters: {
		employees(state){
			return state.employees;
		},

		getEmployeeData: (state, getters) => (id) => {
			return getters.employees.filter(e => e.id === id)[0];
		}

	},
	mutations: {

	},
	actions: {

	}
});