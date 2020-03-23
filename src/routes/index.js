import AppCart from '@/components/cart';
import AppOrder from '@/components/order';
import AppResults from '@/components/results';
import AppProductsList from '@/components/products/list';
import AppProductsItem from '@/components/products/item';
import AppError404 from '@/components/errors/404';

const routes = [
	{
		name: 'home',
		path: '/',
		component: AppProductsList
	},
	{
		name: 'product',
		path: '/product/:id',
		component: AppProductsItem
	},
	{
		name: 'cart',
		path: '/cart',
		component: AppCart
	},
	{
		name: 'order',
		path: '/checkout',
		component: AppOrder
	},
	{
		name: 'result',
		path: '/result',
		component: AppResults
	},
	{
		path: '**',
		component: AppError404,
		exact: false
	}
];

const routesMap = {};

routes.forEach(route => {
	if('name' in route){
		routesMap[route.name] = route.path;
	}
});

export { routes, routesMap };