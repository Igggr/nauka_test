<template>
	<div>
		<div>Добавление/Редактирование profile employee {{ id }}</div>
	
		<img src="" alt="employee photo">
		{{ employeeData }}

		<!--<input type="text" v-model="name">-->
	</div>
</template>

<script>
	import employeeDataMixin from './employeeDataMixin.js';

	export default {
		computed: {
			id(){
				return this.$store.getters.selectedEmployeeId;
            },

		},
		mixins: [employeeDataMixin]

	}
</script>