import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const server = 'http://localhost:5000/'
/*

let employees = [
  {"id" : 1, "name": "Anton", "surname": "Bursa", "birthdate": "1983-12-10", "job_title": "manager", "remote": false, "city": "spb", "street": "Nevskiy", "house": 124, "flat": 17 },
  {"id": 2, "name": "Pavel", "surname": "Scetov", "birthdate": "1991-12-10", "job_title": "coder", "remote": true, "city": "Moscow", "street": "Liteyniy", "house": 35, "flat": 9 }
]
*/

export const store = new Vuex.Store({
	state: {
		employees: [], //employees,
		shouldUpdate: true,
		selectedEmployeeId: -1
	},
	getters: {
		employees(state){
			return state.employees;
		},
		selectedEmployeeId(state){
			return state.selectedEmployeeId;
		},
		getEmployeeData: (state, getters) => (id) => {
			return getters.employees.filter(e => e.id === id)[0];
		}

	},
	mutations: {
		setEmployyesData(state, data){
			state.employees = data;
			state.shouldUpdate = false;
		},
		setUpdateStatus(state, status) {
			state.shouldUpdate = status
		},
		selectEmployee(state, id){
			state.selectedEmployeeId = id;
		}

	},
	actions: {
		checkUpdate(context) {
			if (context.state.shouldUpdate) {
				context.dispatch('loadEmployeesData');
			}
		},
		loadEmployeesData(context) {
			//context.commit("setUpdateStatus", "aaaaaaa");

		    fetch('http://localhost:5000/employees/') 
            .then(
            	response => response.json(),            
                err => console.log(err)) 
            .then( 
            	myJson => context.commit('setEmployyesData', myJson)               
            );
		}

	}
});