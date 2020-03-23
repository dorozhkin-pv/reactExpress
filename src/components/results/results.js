import React from 'react';
import withStore from '@/hocs/withStore';

class Results extends React.Component{
	render(){
		let { cartStore, orderStore } = this.props.rootStore;
		let { formData } = orderStore;

		return <>
			<h1>Result</h1>
			<hr/>
			<p><strong>Hello, { formData.name.value }</strong></p>
			<p><strong>Total: { cartStore.total }</strong></p>
			<p><strong>Details was send to email: { formData.email.value }</strong></p>
		</>
	}
}

export default withStore(Results);