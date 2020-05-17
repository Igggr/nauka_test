<template>
	<div :class="{selected: is_selected}">сотрудник {{ id }}: {{ employeeData }}<hr></div>
</template>

<script>
	export default {
		props: {
			is_selected : {
				type: Boolean,
				default: false
			},
			id: {
				type: Number,
				required: true
			}
		},
		computed: {
			employeeData() {
				return this.$store.getters.getEmployeeData(this.id);
				//return this.$store.getters.employees[this.id - 1];  // ?????
			}
		}
		
	}
</script>


<style scoped>
	.selected {
		background-color: lightgreen;
	}
</style>