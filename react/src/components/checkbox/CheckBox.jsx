import React from 'react';
import ReactDOM from 'react-dom';

class CheckBoxComponent extends React.Component{
	componentDidMount() {
		const _options = this.props.options;
	    for(let i=0; i<_options.length; i++){
	    	if(_options[i].checked){
	    		ReactDOM.findDOMNode(this.refs['checkbox-'+ i]).className = 'ui-checkbox on';
	    	}else{
	    		ReactDOM.findDOMNode(this.refs['checkbox-'+ i]).className = 'ui-checkbox';
	    	}
	    }
	}
	handleChecked(index){
		const _this = ReactDOM.findDOMNode(this.refs['checkbox-'+index]);
		if(_this.className == 'ui-checkbox'){
			_this.className = 'ui-checkbox on';
		}else{
			_this.className = 'ui-checkbox';
		}
	}
	render(){
		return(
			<div className="del-item">
				{this.props.options.map((item,index) => {
					return (
						<div key={index} ref={'checkbox-'+index} className="ui-checkbox" onClick={this.handleChecked.bind(this,index)}>
							<input className="input-hidden" type="checkbox" onChange={this.props.onChange.bind(this,index)} defaultChecked={item.checked}/>
							<span className="checkbox-body"></span>
							<span className="checkbox-text">{item.text}</span>
						</div>
					)
				})}
			</div>
		)
	}
}

CheckBoxComponent.defaultProps = {
	onChange(){},
}

export default CheckBoxComponent;