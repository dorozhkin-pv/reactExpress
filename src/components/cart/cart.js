import React from 'react';
import withStore from '@/hocs/withStore';
import MinMax from '@/components/inputs/minmax';
import { Link } from 'react-router-dom';
import { routesMap } from '@/routes';

class Cart extends React.Component{
	render(){
		let content;
		let { cartStore, productsStore } = this.props.rootStore;

		if (cartStore.products.length) {
			let tableRows = cartStore.products.map((item, i) => {
				const pr = productsStore.getById(item.id);
	
				return <tr key={ pr.id }>
					<td>{ pr.title }</td>
					<td>{ pr.price }</td>
					<td>
						<MinMax max={pr.rest} 
								  current={item.cnt} 
								  onChange={ cnt => cartStore.changeCnt(pr.id, cnt) }
						/>
					</td>
					<td>{ pr.price * item.cnt }</td>
					<td>
						<button type="button" onClick={ () => cartStore.remove(pr.id) }>
							X
						</button>
					</td>
				</tr>
			});

			content = (
				<table>
					<tbody>
						<tr>
							<td>Title</td>
							<td>Price</td>
							<td>Count</td>
							<td>Total</td>
						</tr>
						{ tableRows }
					</tbody> 
				</table>
			);
		} else {
			content = <h6>Cart is empty</h6>;
		}

		return <>
			<h1>Cart</h1>
			{ content }
			<hr/>
			<strong>Total: { cartStore.total }</strong>
			<hr/>
			<Link className="btn btn-success" to={routesMap.order}>Next step</Link>
		</>
	}
}

export default withStore(Cart);