import React from 'react';
import withStore from '@/hocs/withStore';
import Page404 from '@/components/errors/404';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routesMap } from '@/routes';

class ProductsItem extends React.Component{
	render(){
		let { cartStore, productsStore } = this.props.rootStore;
		
		let content;
		const id = this.props.match.params.id;
		const product = productsStore.getById(id);

		let btnToCart = cartStore.inCart(id) ? 
				<Button variant="danger" 
					onClick={() => cartStore.remove(id)}
				>
					Remove
				</Button> :
				<Button variant="success" 
					onClick={() => cartStore.add(id)}
				>
					Add to cart
				</Button>;
		
		if (product) {
			content = (
				<Card>
					<Card.Body>
						<Card.Title>{product.title}</Card.Title>
						<Card.Text>
							<strong>Price: {product.price}</strong>
						</Card.Text>
						<hr/>
						{ btnToCart }
					</Card.Body>
				</Card>
			)
		} else {
			content = <Page404 />;
		}

		return <>
			<h1>Product ID: { id }</h1>
			<hr/>
			{ content }

			<Link to={routesMap.home}>
				Back to list
			</Link>
		</>
	}
}

export default withStore(ProductsItem);