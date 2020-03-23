import React from 'react';
import withStore from '@/hocs/withStore';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routesMap } from '@/routes';

class Order extends React.Component{
	state = { modal: false };

	hideModal = () => this.setState({modal: false})
	showModal = () => this.setState({modal: true})
	//onSend = () => this.props.history.push('/result');

	render(){
		let { cartStore, orderStore } = this.props.rootStore;

		let formFields = [];

		for(let name in orderStore.formData){
			let field = orderStore.formData[name];
			let formElem = (
				<Form.Group key={name} controlId={`order-form-${name}`}>
					<Form.Label>{ field.title }</Form.Label>
					<Form.Control
						type="text"
						onChange={(e) => orderStore.change(name, e.target.value) }
						value={ field.value }
					/>
					{ field.valid !== false || 
						<Form.Text className="text-danger">
							{ field.errorText }
						</Form.Text> 
					}
				</Form.Group>);
			formFields.push(formElem);
		}

		return <>
			<h1>Order</h1>
			<hr/>
			<Form>
				{ formFields }
				<hr/>
				<Link className="btn btn-warning" to={routesMap.cart}>
					Back to cart
				</Link>
				<Button variant="success" onClick={this.showModal} disabled={!orderStore.allValid || !cartStore.products.length}>
					Send order
				</Button>
			</Form>
			<Modal show={this.state.modal} backdrop="static">
				<Modal.Header>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Modal body text goes here.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.hideModal}>No-no</Button>
					<Link className=" btn btn-primary" to={routesMap.result}>
						All right
					</Link>
				</Modal.Footer>
			</Modal>
		</>
	}
}

export default withStore(Order);