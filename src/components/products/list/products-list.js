import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import withStore from '@/hocs/withStore';
import { routesMap } from '@/routes';
import urlBuilder from '@/routes/urlBuilder';

class ProductsList extends React.Component{
	render(){
		let { products } = this.props.rootStore.productsStore;
		let { cartStore } = this.props.rootStore;

		let productsCards = products.map((pr, i) => {
			let btnToCart = cartStore.inCart(pr.id) ? 
				<Button variant="danger" 
					onClick={() => cartStore.remove(pr.id)}
				>
					Remove
				</Button> :
				<Button variant="success" 
					onClick={() => cartStore.add(pr.id)}
				>
					Add to cart
				</Button>;

			return <Col xs={4} key={pr.id}>
				<Card>
					<Card.Body>
						<Card.Title>{pr.title}</Card.Title>
						<Card.Text>
							<strong>Price: {pr.price}</strong>
						</Card.Text>
						<Link to={'/product/' + pr.id}>
							Get more...
						</Link>
						<hr/>
						<Link to={urlBuilder(routesMap.product, pr.id)}>more...</Link>
						<hr/>
						{ btnToCart }
					</Card.Body>
				</Card>
			</Col>
		});
		
		return <>
			<h1>Products</h1>
			<hr/>
			<Row>{productsCards}</Row>
		</>
	}
}

export default withStore(ProductsList);