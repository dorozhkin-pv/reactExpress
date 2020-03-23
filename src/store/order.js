import { observable, computed, action } from 'mobx';

class OrderStore{
	@observable formData = {
		name: { 
			title: 'Name', 
			value: '',
			valid: null,
			validator: (val) => /^[aA-zZ]{2,15}$/.test(val),
			errorText: 'Incorrect Name (latin from 2 to 15 char)'
		},
		email: { 
			title: 'Email', 
			value: '',
			valid: null,
			validator: (val) => /^[a-z]+@[a-z]+\.[a-z]+$/.test(val),
			errorText: 'Incorrect email'
		},
		phone: { 
			title: 'Phone', 
			value: '',
			valid: null,
			validator: (val) => /^\d{7,14}$/.test(val),
			errorText: 'Incorrect Phone (only numbers min 7 max 14)'
		}
	}

	@computed get allValid(){
		return Object.values(this.formData).every(field => field.valid);
	}

	@action change(name, value){
		let field = this.formData[name];
		field.value = value.trim();
		field.valid = field.validator(field.value);
	}
}

export default OrderStore;