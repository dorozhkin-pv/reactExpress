import products from '@/store/products';
import cart from '@/store/cart';
import order from '@/store/order';

class RootStore {
    productsStore = new products(this);
    cartStore = new cart(this);
    orderStore = new order(this);
}

export default new RootStore();