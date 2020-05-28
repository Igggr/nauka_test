import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const server = 'http://localhost:8000/'


function defaultEmployeeData(){
  return {"id": null, "name": null,  "surname": null, "birth_date": null,
          "post": "", "is_remote": false,
          "city": null, "street": null, "flat": null, "house": null};
}


function serializeEmployee(data){
	return JSON.stringify({
		"name": data.name, "surname": data.surname, "birth_date": data.birth_date,
		"post": data.post, "is_remote": data.is_remote, 
	     "city": data.city, "street": data.street, "house": data.house, "flat": data.flat
	 });
}


export const store = new Vuex.Store({
	state: {
		employees: [], //employees,
		unsavedEmployee: defaultEmployeeData(),
        creating_new: false,    // switch between creating new and editing existing employees
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
			return serializeEmployee(data);
		},
		getNewEmployeeSerializedData(state, getters){
			const data = state.unsavedEmployee;
			return serializeEmployee(data);
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
		},
		deleteEmployee(state, id){
			let i = state.employees.map(item => item.id).indexOf(id); // find index of your object
            state.employees.splice(i, 1)
		},
		saveNewEmployee(state, id){
			let employee = state.unsavedEmployee;
			employee.id = id;
			state.employees.push(employee);
			state.unsavedEmployee = defaultEmployeeData();
			state.creating_new = false;
		},
		setCreatingStatus(state, bln) { // switch between creating new employee and editing an old one
			state.creating_new = bln;
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
		deleteSelectedEmployee(context) {  // delete from server - and then filter local store
			context.dispatch("deleteSelectedEmployeeFromServer")
			.then(() => context.dispatch("deleteSelectedEmployeeFromClient"));

		},
		deleteSelectedEmployeeFromServer(context) {  // from server
			let url = `${server}employees/${context.getters.selectedEmployeeId}`;
			fetch(url,
				{method: "DELETE",
                 headers: {
                          "Access-Control-Allow-Origin": "*",                       
                          }
			    }
			)
		},
		deleteSelectedEmployeeFromClient(context){ // in order not to pull employe data from server again - just filter local store data
			context.commit("deleteEmployee", context.getters.selectedEmployeeId);
		},
		saveChangesToServer(context){
			let url = `${server}employees/${context.getters.selectedEmployeeId}`;
			fetch(url,
				{
					method: "PUT",  
				    headers: {
                          "Access-Control-Allow-Origin": "*",
                          "Content-Type": "application/json"
                    },
                    body: context.getters.getSelectedEmployeeSerializedData
			    }
			);
		},
		saveNewEmployee(context){
			context.dispatch("uploadNewEmployeeToServer")
			.then((resp) => resp.json())
			.then((id) =>context.commit("saveNewEmployee", id))
			
		},
		uploadNewEmployeeToServer(context){
			let url = `${server}employees/`;
			return fetch(url,
				{
					method: "POST",  
				    headers: {
                          "Access-Control-Allow-Origin": "*",
                          "Content-Type": "application/json"
                    },
                    body: context.getters.getNewEmployeeSerializedData
			    }
			)
		}

	}
});