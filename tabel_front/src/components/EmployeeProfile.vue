<template>
	<div>Добавление/Редактирование profile employee {{ id }}

	</div>
</template>

<script>
	export default {
		computed: {
			id(){
				return this.$route.params.id;
			},
			employeeData() {
				return this.$store.getters.getEmployeeData(this.id);
			}
		}

	}
</script>