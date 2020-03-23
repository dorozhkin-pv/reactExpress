import { observable, computed, action } from 'mobx';
import rootStore from '@/store/rootStore';

class CartStore{
	@observable products = [];

	@computed get total(){
		return this.products.reduce((total, item) => {
			let product = rootStore.productsStore.getById(item.id);
			return total + product.price * item.cnt;
		}, 0);
	}

	@action checkStorage(cart) {
		cart = JSON.parse(cart);
		cart.forEach(pr => this.add(pr.id));
	}

	@action add(id){
		if(!this.inCart(id)){
			this.products.push({ id, cnt: 1 });
			localStorage.setItem('myCart', JSON.stringify(this.products));
		}
	}

	@action remove(id){
		let ind = this._getIndexById(id);

		if(ind !== -1){
			this.products.splice(ind, 1);
			localStorage.setItem('myCart', JSON.stringify(this.products));
		}
	}

	@action changeCnt(id, cnt){
		let ind = this._getIndexById(id);

		if(ind !== -1){
			this.products[ind].cnt = cnt;
		}
	}

	inCart(id){
		let ind = this._getIndexById(id);
		return ind !== -1;
	}

	_getIndexById(id){
		return this.products.findIndex(pr => pr.id == id);
	}
}

export default CartStore;