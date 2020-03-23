import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default class extends React.PureComponent{
	static propTypes = {
		min: PropTypes.number,
		max: PropTypes.number.isRequired,
		current: PropTypes.number.isRequired,
		onChange: PropTypes.func
	}

	static defaultProps = {
		min: 1,
		onChange: function(){}
	}

	state = {
		inputVal: this.props.current
	}

	increase = () => this.set( this.props.current + 1 );
	decrease = () => this.set( this.props.current - 1 );
	onInput = (e) => this.setState({ inputVal: e.target.value});
	
	onBlur = () => {
		let num = parseInt(this.state.inputVal);

		if(isNaN(num)){
			num = this.props.min;
		}

		this.set(num);
	}

	set(newValue){
		let current = Math.min(Math.max(this.props.min, newValue), this.props.max);
		this.setState({ inputVal: current });
		this.props.onChange(current);
	}

	render(){
		let { min, max, current } = this.props; 
		let { inputVal } = this.state;

		return <>
			<button type="button" onClick={this.decrease} disabled={current <= min} className={styles.min}>
				-1
			</button>
			<input type="text" 
					 value={inputVal} 
					 onChange={this.onInput} 
					 onBlur={this.onBlur} 
					 className={styles.input}
			/>
			<button type="button" onClick={this.increase} disabled={current >= max} className={styles.max}>
				+1
			</button>
		</>
	}
}