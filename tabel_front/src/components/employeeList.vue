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
                if (this.$store.state.selectedEmployeeId === -1){
                    alert("сначала выберите работника для удаления - кликнув по строке с ним");
                } else {
        		   this.$store.dispatch("deleteSelectedEmployee");
                }
        	},
        	addEmployee(){
                this.$store.commit('setCreatingStatus', true);
        		this.$router.push('/profile/new')
        	},
        	editEmployee(){
                if (this.$store.state.selectedEmployeeId === -1){
                    alert("сначала выберите работника для изменения - кликнув по строке с ним");
                } else {
        		    this.$router.push(`/profile/${this.selectedEmployeeId}`);
                }
        	},
        	selectEmployee(id){
        		this.$store.commit('selectEmployee', id)
        	}

        },
        computed: {
        	employees(){
        		return this.$store.getters.employees;
        	},
        	selectedEmployeeId(){
        		return this.$store.getters.selectedEmployeeId;
        	}
        },
		components: {
			EmployeeLine
		}

	};
</script>