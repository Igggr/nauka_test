<template>
	<div>
       <label>поиск по имени или фамилии</label><br>
       <input type="text" v-model="filters"> {{filters}}
       <div class="btn-group">
	     <button @click="addEmployee">добавить</button>
	     <button @click="editEmployee">редактировать</button>
	     <button @click="deleteEmployee">удалить</button>
	   </div>

       <div class="line line-head">
         <div class="photo">Превью</div>
         <div class="name">Имя</div>
         <div class="surname">Фамилия</div>
         <div class="birthdate">Дата рождения</div>
         <div class="age">Возраст</div>
         <div class="post">Должность</div>
         <div class="is_remote">Удаленная работа</div>
         <div class="adress">Адресс проживания</div>
       </div>

	   <EmployeeLine v-for="employee in this.filteredEmployees"
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
        	},
            filters: {
                get() {
                    return this.$store.state.filters;
                },
                set(value) {
                    return this.$store.state.filters = value;
                }
            },
            filteredEmployees(){
                if (!this.filters) {
                    return this.employees;
                } else {
                    let s = this.filters.toLowerCase();
                    return this.employees.filter(e => {
                        return e.name.toLowerCase().startsWith(s) || e.surname.toLowerCase().startsWith(s);
                    })
                }
            }
        },
		components: {
			EmployeeLine
		}

	};
</script>

<style scoped>
    @import 'table_style.css';  /* column width */

    .line-head {
        background: lightgrey;
    }
    .btn-group {
        margin: 10px;
    }

</style>