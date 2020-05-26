export default {
	computed: {
		employeeData() {
			return this.$store.getters.getEmployeeData(this.id);
		},
		name() {
				return this.employeeData.name;
			},
			surname() {
				return this.employeeData.surname;
			},
			birthdate() {
				return this.employeeData.birth_date;
			},
			age() { // TODO
				return this.birthdate;
			}, 
			post(){
				return this.employeeData.post;
			},
			is_remote(){
				return this.employeeData.is_remote;
			},
			adress(){
				return `г. ${this.employeeData.city}, ${this.employeeData.street} 
				${this.employeeData.house} кв. ${this.employeeData.flat}`;
			}
	},
}