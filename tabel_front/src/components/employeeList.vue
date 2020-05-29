<template>
	<div>
       <label>поиск по имени или фамилии</label><br>
       <input type="text" v-model="filters"> {{filters}}
       <div class="btn-group">
	     <button @click="addEmployee">добавить</button>
	     <button @click="editEmployee">редактировать</button>
	     <button @click="deleteEmployee">удалить</button>
	   </div>


       {{ this.$store.state.employees_photo[1]}}


       <div class="line line-head">
         <div class="photo">Превью</div>
         <div class="name" @click="setSortStrategy('name')">Имя<span class="sort-arrow">↕</span></div>
         <div class="surname" @click="setSortStrategy('surname')">Фамилия<span class="sort-arrow">↕</span></div>
         <div class="birthdate" @click="setSortStrategy('birth_date')">Дата <span class="sort-arrow">↕</span></div>
         <div class="age" @click="setSortStrategy('birth_date')">Возраст<span class="sort-arrow">↕</span></div>
         <div class="post" @click="setSortStrategy('post')">Должность<span class="sort-arrow">↕</span></div>
         <div class="is_remote" @click="setSortStrategy('is_remote')">Удаленная работа<span class="sort-arrow">↕</span></div>
         <div class="adress">Адресс проживания</div>
       </div>

	   <EmployeeLine v-for="employee in this.sortedAndFiltredEmployees"
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
			return { "sortStrategy": null, "sortReversed": false };
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
        	},
            setSortStrategy(strategy){
                if (this.sortStrategy === strategy) {
                    this.sortReversed = !this.sortReversed;
                }
                this.sortStrategy = strategy;
            },
            compareEmployees(empl_1, empl_2) {
                return empl_1[this.sortStrategy] < empl_2[this.sortStrategy];
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
            },
            sortedAndFiltredEmployees(){
                if (this.sortStrategy === null){
                    return this.filteredEmployees;
                } else {
                    let emps =  this.filteredEmployees.sort(this.compareEmployees);
                    if (this.sortReversed){
                        return emps.reverse();
                    } else {
                        return emps;
                    }
                }

            },
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
    .sort-arrow {
        font-size: 140%;
        font-weight: bold;
        position: relative;
        float: right;
        margin-left: 2px;
    } 

</style>