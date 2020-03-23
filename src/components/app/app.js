import React from 'react';
import withStore from '@/hocs/withStore';
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import { routes, routesMap } from '@/routes';
import { Container, Row, Col, Alert } from 'react-bootstrap';

class App extends React.Component{
	componentDidMount() {
		let cart = localStorage.getItem('myCart');
		if (cart) {
			let { cartStore } = this.props.rootStore;
			cartStore.checkStorage(cart);
		}
	}

	render(){
		let { cartStore } = this.props.rootStore;
		
		let routeComponents = routes.map(route => {
			return <Route 
				key={route.path}
				path={route.path} 
				component={route.component} 
				exact={ 'exact' in route ? route.exact : true } 
			/>
		});

		return <BrowserRouter>
			<Alert variant='primary'>
				<Container>
					<Row>
						<Col md={{ span: 4, offset: 8 }}>
							<Link to={ routesMap.cart }>Cart: </Link>
							Products: { cartStore.products.length }{' '}
							Total: { cartStore.total }
						</Col>
					</Row>
				</Container>
			</Alert>
			<Container>
				<Row>
					<Col xs={12} md={3}>
						<ul className="list-group">
                     <li className="list-group-item">
								<NavLink to={routesMap.home} exact activeClassName="text-danger">Products</NavLink>
							</li>
							<li className="list-group-item">
								<NavLink to={routesMap.cart} exact activeClassName="text-danger">Cart</NavLink>
							</li>
							<li className="list-group-item">
								<NavLink to={routesMap.order} exact activeClassName="text-danger">Order</NavLink>
							</li>
						</ul>	
					</Col>
					<Col xs={12} md={9}>
						<Switch>
							{ routeComponents }
						</Switch>
					</Col>
				</Row>
			</Container>
		</BrowserRouter>
	}
}

export default withStore(App); 