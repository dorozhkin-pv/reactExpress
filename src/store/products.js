import { all as getProducts } from '@/api/products';
import { observable, computed, action } from 'mobx';

class ProductsStore{
	@observable products = getProducts();

	@computed get productsMap(){
		let map = {};

		this.products.forEach((pr, i) => {
			map[pr.id.toString()] = i;
		});

		return map;
	}

	getById(id){
		if(id in this.productsMap){
			let ind = this.productsMap[id];
			return this.products[ind];
		}
		
		return null;
	}
}

export default ProductsStore;