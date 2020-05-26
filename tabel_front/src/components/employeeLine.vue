<template>
	<div class="line" :class="{selected: is_selected}">
		<div>{{ id }}</div>
		<div>{{ name }}</div>
		<div>{{ surname }}</div>
		<div>{{ birthdate }}</div>
		<div>{{ age }}</div>
		<div>{{ post }}</div>
		<div>{{ is_remote }}</div>
		<div>{{ adress }}</div>

	</div>

</template>

<script>

	import employeeDataMixin from './employeeDataMixin.js';

	export default {
		props: {
			id: {
				type: Number,
				required: true
			}
		},
		computed: {
			is_selected(){
				return this.$store.getters.selectedEmployeeId == this.id;
			}
		},
		mixins: [employeeDataMixin]
		
	}
</script>


<style scoped>
	.selected {
		background-color: lightgreen;
	}
	.line {
		display: flex;
	}
	.line div {
		border: 1px solid black;
	}
</style>