<template>
	<div class="line" :class="{selected: is_selected}" height="50px">
		<div class="photo">
			<img :src="photo" height="50px">
		</div>
		<div class="name">{{ name }}</div>
		<div class="surname">{{ surname }}</div>
		<div class="birthdate">{{ birthdate }}</div>
		<div class="age">{{ age }}</div>
		<div class="post">{{ post }}</div>
		<div class="is_remote"><input type="checkbox" disabled :checked=is_remote></div>
		<div class=adress>{{ adress }}</div>

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

    @import 'table_style.css';  /* column width */

	.selected {
		background-color: lightgreen;
	}
</style>