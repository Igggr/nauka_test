<template>
	<div class="profile">
		<div class="header">
			Добавление/Редактирование profile employee {{ id }}{{ employeeData }} "{{posts}}"
		</div>
		 
		<div class="photo">
		  <img src="" alt="employee photo">
		</div>

		<div class="name">
          <label>имя</label><br>
		  <input type="text" v-model="name">
	    </div>

	    <div class="surname">
		  <label>фамилия</label><br>
		  <input type="text" v-model="surname">
		</div>

		<div class="birthdate">
		  <label>дaта рождения</label><br>
		  <input type="date" v-model="birthdate">
		</div>

		<div class="post">
		  <label>должность</label><br>
		  <select v-model="post">
		  	<option v-for="post in posts">{{ post.title }}</option>
		  </select>
		</div>

        <div class="city">
		  <label>город</label><br>
		  <input type="text" v-model="city">
	    </div>

	    <div class="street">
          <label>улица</label><br>
		  <input type="text" v-model="street">
	    </div>

        <div class="house">
		  <label>дом</label><br>
		  <input type="text" v-model="house">
		</div>


        <div class="flat">
		  <label>квартира</label><br>
		  <input type="text" v-model="flat">
		</div>
        
        <div class="is_remote">
		  <label>удаленка</label><br>
		  <input type="checkbox" v-model="is_remote">
	    </div>

	    <div class="save">
		  <button @click="save">cохранить</button>
	    </div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import employeeDataMixin from './employeeDataMixin.js';

	export default {
		computed: {
			id(){
				return this.$store.getters.selectedEmployeeId;
            },
			...mapGetters(["posts" ])
		},
		mixins: [employeeDataMixin],
		methods: {
			save(){
				this.$store.dispatch("saveChangesToServer")
				.then(() => this.$router.push({name: "all_employee"}));
			}
		}

	}
</script>

<style scoped>
  .profile {
  	border: 1px solid black;
  	display: grid;
  	grid-template-columns: 1fr 1fr 1fr;
  	grid-auto-rows: 100px;
  	grid-template-areas: 
  	   "header header header"
  	   "photo name city"
  	   "photo surname street"
  	   "photo birthdate house"
  	   "photo post flat"
  	   "photo is_remote save";
  }

  .header {
  	grid-area: header;
  }
  .photo {
  	grid-area: photo;
  }
  .name {
  	grid-area: name;
  }
  .city {
  	grid-area: city;
  }
  .surname {
  	grid-area: surname;
  }
  .street {
  	grid-area: street;
  }
  .birthdate {
  	grid-area: birthdate;
  }
  .house {
  	grid-area: house;
  }
  .post {
  	grid-area: post;
  }
  .flat {
  	grid-area: flat;
  }
  .is_remote {
  	grid-area: is_remote;
  }
  .save {
  	grid-area: save;
  }
</style>