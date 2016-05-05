import React from 'react';
import ReactDOM from 'react-dom';

class InputTextComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			defaultValue: ''
		}
	}
	componentWillReceiveProps(nextProps) {
	     this.setState({defaultValue: nextProps.value})  
	}
	render(){
		let options = this.props.options;
		return (
			<div className="info-item ui-input">
				<label className="ui-label">
					<span className="label-sign">*</span>
					<span className="label-text">{options.label}</span>
				</label>
				<input className="input-body" placeholder={options.placeholder} value={this.state.defaultValue} onChange={this.props.onChange}/>
			</div>
		)
	}
}

InputTextComponent.defaultProps = {
	defaultValue: '',
}

export default InputTextComponent;