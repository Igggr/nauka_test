<template>
	<div class="profile">
		<div class="header">
		    <span v-if="this.$store.state.creating_new">
		    	Добавление сотрудника
		    </span>
		    <span v-else>
			    Редактирование сотрудника {{ id }}
			</span>
		</div>
		 
		<div class="photo">
			<!--
			<form id="photoform" action="http://localhost:8000/uploads/" method="post" enctype="multipart/form-data">
			-->  
		      <img :src="photo" alt="employee photo">
		    <!-- </form> -->
		</div>
		<div class="loader">
			<input type="file" name="file" id="photo"><br>
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
			...mapGetters(["posts" ]),
			photoform(){
				return document.getElementById('photoform');
			},
			photoNew() {
				return document.getElementById("photo");
			}
		},
		mixins: [employeeDataMixin],
		methods: {
			save(){
				if (this.$store.state.creating_new){
					this.uploadNewEmployee();
				} else {
					this.updateExistingEmployee()
				}
				//this.photoform.submit();

				let formData = new FormData();
				let photo = document.getElementById("photo")

                formData.append("file", this.photoNew.files[0]);
                //console.log(photo)
                //console.log(photo.files)


				fetch(`http://localhost:8000/uploads/${this.id}`, {
					method: "POST",  
				    headers: {
                          "Access-Control-Allow-Origin": "*",
                          "ConetetType": "image/jpeg",
                    },
                    body: formData
			    })
					
			},
			updateExistingEmployee(){
				this.$store.dispatch("saveChangesToServer")
				.then(() => this.$router.push({name: "all_employee"}));
			},
			uploadNewEmployee(){
				if (this.is_data_valid) {
				    this.$store.dispatch("saveNewEmployee")
				    .then( () => this.$router.push({name: "all_employee"}));
			    } else {
			    	alert("введите корректные данные")
			    }
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
  	   "loader is_remote save";
  }

  .header {
  	grid-area: header;
  }
  .photo {
  	grid-area: photo;
  	width: 100%;
  	height: auto;
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