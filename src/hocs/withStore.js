import React from 'react';
import { observer } from "mobx-react";
import rootStore from '@/store/rootStore';

export default function(Component){
	let ObservedComponent = observer(Component);

	return function(props){
		return <ObservedComponent {...props} rootStore={rootStore} />
	}
}