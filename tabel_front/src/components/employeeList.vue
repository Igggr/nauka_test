<template>
	<div>
	   cписок сотрудников
	   {{ employees }}<hr>

	   <button @click="addEmployee">добавить</button>
	   <button @click="editEmployee">редактировать</button>
	   <button @click="deleteEmployee">удалить</button>
	   <hr>

	   <EmployeeLine v-for="employee in employees"
	        :is_selected="selectedEmployeeId === employee.id"
	        :id="employee.id"
	        @click.native="selectEmployee(employee.id)"
	   >
	   </EmployeeLine>
    </div>
</template>

<script>

	import EmployeeLine from './employeeLine.vue';

	export default {
		data() {
			return {selectedEmployeeId: -1}
		},
        methods: {
        	deleteEmployee() {

        	},
        	addEmployee(){
        		this.$router.push('/profile/x')
        	},
        	editEmployee(){
        		this.$router.push(`/profile/${this.selectedEmployee}`)
        	},
        	selectEmployee(id){
        		this.selectedEmployeeId = id;
        	}

        },
        computed: {
        	employees(){
        		return this.$store.getters.employees;
        		//return this.$store.state.employees;
        	}
        },
		components: {
			EmployeeLine
		}

	};
</script>