export default {
	computed: {
		employeeData() {
			if (this.$store.state.creating_new) {
				return this.$store.state.unsavedEmployee;
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
		age() {
			let today = new Date();
            let birthDate = new Date(this.birthdate);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
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
		},
		is_data_valid(){
			return this.name && this.surname && this.birthdate && this.post
			&& this.city && this.street && this.house && this.flat && !isNaN(this.flat);
		}
	},
}