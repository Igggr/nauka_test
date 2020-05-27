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
		posts: [],
		shouldUpdate: true,
		selectedEmployeeId: -1
	},
	getters: {
		employees(state){
			return state.employees;
		},
		posts(state){
			return state.posts;
		},
		selectedEmployeeId(state){
			return state.selectedEmployeeId;
		},
		getEmployeeData: (state, getters) => (id) => {
			return getters.employees.filter(e => e.id === id)[0];
		}

	},
	mutations: {
		setEmployesData(state, data){
			state.employees = data;
			state.shouldUpdate = false;
		},
		setPostsData(state, data){
			state.posts = data;
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
				context.dispatch('loadPostsData');
			}
		},
		loadEmployeesData(context) {
		    fetch(`${server}/employees/`) 
            .then(
            	response => response.json(),            
                err => console.log(err)) 
            .then( 
            	myJson => context.commit('setEmployesData', myJson)               
            );
		},
		loadPostsData(context){
			fetch(`${server}/posts/`) 
            .then(
            	response => response.json(),            
                err => console.log(err)) 
            .then( 
            	myJson => context.commit('setPostsData', myJson)               
            );
		},
		deleteEmployee(context) {
			let url = `${server}${context.getters.selectedEmployeeId}/`;
			alert(url);
			fetch(url,
				{method: "DELETE"}
			)
		},
		saveChangesToServer(context){
			let url = `${server}${context.getters.selectedEmployeeId}/`;
			alert(url);
			fetch(url,
				{method: "PUT"}
			)
		}

	}
});