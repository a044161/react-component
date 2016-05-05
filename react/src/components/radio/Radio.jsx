import React from 'react';
import ReactDOM from 'react-dom';

class RadioComponent extends React.Component{
	componentDidMount() {
	    const _options = this.props.options;
	    for(let i=0; i<_options.length; i++){
	    	if(_options[i].checked){
	    		ReactDOM.findDOMNode(this.refs['radio-'+ i]).className = 'ui-radio on';
	    	}else{
	    		ReactDOM.findDOMNode(this.refs['radio-'+ i]).className = 'ui-radio';
	    	}
	    }
	}
	componentWillReceiveProps(nextProps) {
	    const _options = nextProps.options;
	    for(let i=0; i<_options.length; i++){
	    	if(_options[i].checked){
	    		ReactDOM.findDOMNode(this.refs['radio-'+ i]).className = 'ui-radio on';
	    	}else{
	    		ReactDOM.findDOMNode(this.refs['radio-'+ i]).className = 'ui-radio';
	    	}
	    }
	}
	handleChecked(index){
		for(let i in this.refs){
			ReactDOM.findDOMNode(this.refs[i]).className = 'ui-radio';
		}

		const _this = ReactDOM.findDOMNode(this.refs['radio-'+ index]);
		_this.className = 'ui-radio on';
	}

	render(){
		return(
			<div  className="option-item">
				{this.props.options.map((item, index) => {
					return (
						<div key={index} ref={'radio-'+ index} className="ui-radio" data-radio={item.name} onClick={this.handleChecked.bind(this,index)}>
							<input className="input-hidden" type="radio" name={item.name} value={item.value} defaultChecked={item.checked} onChange={this.props.onChange.bind(this,index)}/>
							<span className="radio-body"></span>
							<span className="radio-text">{item.text}</span>
						</div>
					)
				})}
			</div>
		)
	}
}

RadioComponent.defaultProps = {
	onChange(){},
}

export default RadioComponent