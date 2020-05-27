export default {
	computed: {
		employeeData() {
			if (this.id === -1) {
				return {"flat": null, "surname": "", "post": "", "city": "", "birth_date": null, "street": "", "name": "", "id": null, "is_remote": false, "house": ""};
			}
			return this.$store.getters.getEmployeeData(this.id);
		},
		name: { 
			get() {
				return this.employeeData.name;
		    },
		    set(value){
			    this.employeeData.name = value;
		    }
	    },
		surname: {
			get() {
			    return this.employeeData.surname;
		    },
		    set(value){
		    	this.employeeData.surname = value;
		    }
		},
		birthdate: {
			get() {
			    return this.employeeData.birth_date;
		    },
		    set(value) {
		    	this.employeeData.birth_date = value;
		    }
		},
		age: {
		    get() { // TODO
			    return this.birthdate;
		    },
		    set(value){
		    	this.birthdate = value;
		    }
		}, 
		post: {
			get(){
			    return this.employeeData.post;
		    },
		    set(value) {
		    	return this.employeeData.post = value;
		    }
		},
		is_remote: {
			get(){
			    return this.employeeData.is_remote;
		    },
		    set(value){
		    	this.employeeData.is_remote = value;
		    }
		},
		city: {
			get(){
				return this.employeeData.city;
			},
			set(value){
				this.employeeData.city = value;
			}
		},
		street: {
			get(){
				return this.employeeData.street;
			},
			set(value){
				this.employeeData.street = value;
			}
		},
		house: {
			get(){
				return this.employeeData.house;
			},
			set(value){
				this.employeeData.house = value;
			}
		},
		flat: {
			get(){
				return this.employeeData.flat;
			},
			set(value){
				this.employeeData.flat = value;
			}
		},
		adress(){
			return `г. ${this.city}, ${this.street} 
			${this.house} кв. ${this.flat}`;
		}
	},
}