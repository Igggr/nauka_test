import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const server = 'http://localhost:8000/'



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
		},
		getSelectedEmployeeData(state, getters){
			return getters.getEmployeeData(getters.selectedEmployeeId);
		},
		getSelectedEmployeeSerializedData(state, getters){
			const data = getters.getSelectedEmployeeData;
			return JSON.stringify({
				    "name": data.name, "surname": data.surname, "birth_date": data.birth_date,
			        "post": data.post, "is_remote": data.is_remote, 
			        "city": data.city, "street": data.street, "house": data.house, "flat": data.flat
		           })
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
			let url = `${server}employees/${context.getters.selectedEmployeeId}`;
			//alert(url);
			fetch(url,
				{method: "DELETE",
                 headers: {
                          "Access-Control-Allow-Origin": "*",
                          //"Content-Type": "application/json"
                          }
			    }
			).then(() => context.dispatch("loadEmployeesData"));
		},
		saveChangesToServer(context){
			let url = `${server}employees/${context.getters.selectedEmployeeId}`;
			console.log(url);
			console.log(context.getters.getSelectedEmployeeSerializedData);
			fetch(url,
				{
					method: "PUT",  
				    headers: {
                          "Access-Control-Allow-Origin": "*",
                          "Content-Type": "application/json"
                    },
                    body: context.getters.getSelectedEmployeeSerializedData


			    }
			).then(() => context.dispatch("loadEmployeesData"));
		}

	}
});