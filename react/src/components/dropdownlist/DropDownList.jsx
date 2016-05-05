import React from 'react';
import ReactDOM from 'react-dom';

class DropDownListComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			ddlDefalut: ''
		}
	}
	componentDidMount() {
	    this.setState({ddlDefalut: this.props.defaultValue})  
	}
	handleSelectd(){
		const _this = ReactDOM.findDOMNode(this.refs['dropdown']);

		if(_this.className == 'ui-dropdown'){
			_this.className = 'ui-dropdown open';
		}else{
			_this.className = 'ui-dropdown';
		}
	}
	handleChoseItem(index){
		const data = this.props.options;
		this.props.onSelect(index)
		this.setState({ddlDefalut: data[index].value})
	}
	render(){
		return(
			<div className="ui-dropdown" ref='dropdown' onClick={this.handleSelectd.bind(this)}>
                <span className="dropdown-text">
					{this.state.ddlDefalut}
					<span className="icon"></span>
                </span>
                <ul className="dropdown-body">
                	{this.props.options.map((item, index) => {
                		return(
                			<li key={index} className="dropdown-item" onClick={this.handleChoseItem.bind(this, index)}>{item.value}</li>
                		)
                	})}
                </ul>
            </div>
		)
	}
}

DropDownListComponent.defaultProps = {
	defaultValue: 'select one...',
	onSelect(){}
}

export default DropDownListComponent