import React from 'react';
import ReactDOM from 'react-dom';
import ReactAddons from 'react-addons'

class AddRulesComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			rule_name: '',
			rule_data: []
		}
	}
	componentDidMount() {
	    this.setState({rule_data: this.props.rulesData})  
	}
	componentWillReceiveProps(nextProps) {
	    this.setState({rule_data: nextProps.rulesData})
	}
	handleAddRules(type){ // 添加多条规则
		var _ruleData = this.state.rule_data;
		var rule = {};
		rule.rule_name = this.state.rule_name;
		rule.rule_point = 100;
		_ruleData.push(rule);
		this.props.handleRules(_ruleData)
		this.setState({rule_name:'',rule_data: _ruleData})
	}
	handleDelRule(index){ // 删除规则
		var _ruleData = this.state.rule_data;
		_ruleData.splice(index, 1);
		this.props.handleRules(_ruleData)
		this.setState({rule_data: _ruleData})
	}
	handleInputRule(e){ // 输入规则
		var _value = e.target.value;
		this.setState({rule_name: _value})
	}
	render(){
		return(
			<div className="info-rules multip">
				<div className="rules-multip ui-list">
					<span className="input-group">
						<input type="text" className="list-input" placeholder="请输入规则名称..." onChange={this.handleInputRule.bind(this)} value={this.state.rule_name}/>
						<span className="icon" onClick={this.handleAddRules.bind(this)}></span>
					</span>
					<ul className="list-body">
						{this.state.rule_data.map((item, index) =>{
							return (
								<li key={index} className="list-item">
									<p className="item-text">{item.rule_name}</p>
									<span className="icon delete" onClick={this.handleDelRule.bind(this, index)}></span>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}

export default AddRulesComponent