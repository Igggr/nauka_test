<template>
	<div>

	   <button @click="addEmployee">добавить</button>
	   <button @click="editEmployee">редактировать</button>
	   <button @click="deleteEmployee">удалить</button>
	   <hr>

	   <EmployeeLine v-for="employee in employees"
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
			return {};
		},
        methods: {
        	deleteEmployee() {

        	},
        	addEmployee(){
        		this.$router.push('/profile/x')
        	},
        	editEmployee(){
        		this.$router.push(`/profile/${this.selectedEmployeeId}`)
        	},
        	selectEmployee(id){
        		this.$store.commit('selectEmployee', id)
        	}

        },
        computed: {
        	employees(){
        		return this.$store.getters.employees;
        	}
        },
		components: {
			EmployeeLine
		}

	};
</script>