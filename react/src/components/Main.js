require('styles/common.css');

import React from 'react';

/* Import Component */
import Calendar from './calendar/Calendar.jsx';

import Radio from './radio/Radio.jsx';
import CheckBox from './checkbox/CheckBox.jsx';
import DropDownList from './dropdownlist/DropDownList.jsx';
import InputText from './inputtext/InputText.jsx';

class AppComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			radioOption: [
				{ text:'单选框-1', name:'radio-name', checked: true, value:'radio-1' },
				{ text:'单选框-2', name:'radio-name', checked: false, value:'radio-2' }
			],
			checkboxOption: [
				{text: '多选框-1', value: 'checkbox-1', checked: true},
				{text: '多选框-2', value: 'checkbox-2', checked: false},
				{text: '多选框-3', value: 'checkbox-3', checked: false}
			],
			dropdownOption: [
				{value: '下拉列表-1', id:'1111'},
				{value: '下拉列表-2', id:'2222'},
				{value: '下拉列表-3', id:'3333'},
				{value: '下拉列表-4', id:'4444'}
			],
			inputOption:{
				input_text:{
					label: '这是输入框',
					placeholder: '请输入...',
					value: ''
				}
			}
		}
	}
	handleChangeRadio(index){ // 改变单选框选项
		const _radioOption = this.state.radioOption;

		for(let r=0; r < _radioOption.length; r++){
			_radioOption[r].checked = false
		}

		_radioOption[index].checked = true;
		this.setState({radioOption: _radioOption})
	}
	handleChangeCheckBox(index){ // 改变多选框选项
		let _checkboxOption = this.state.checkboxOption;

		if(_checkboxOption[index].checked){
			_checkboxOption[index].checked = false;
		}else{
			_checkboxOption[index].checked = true;
		}

		this.setState({checkboxOption: _checkboxOption})
	}
	handleChangeDropDownList(){ // 下拉列表选项变化时触发

	}
	handleChangeInputText(e){ // 输入框有文字输入时触发
		let _value = e.target.value;
		let _inputOption = this.state.inputOption;

		_inputOption.input_text.value = _value;

		this.setState({inputOption: _inputOption})
	}
  	render() {
	    return (
	      <div>
	      	<Calendar/>
	      	<Radio options={this.state.radioOption} onChange={this.handleChangeRadio.bind(this)}/>
	      	<CheckBox options={this.state.checkboxOption} onChange={this.handleChangeCheckBox.bind(this)}/>
	      	<DropDownList defaultValue="请选择一个..." options={this.state.dropdownOption} onSelect={this.handleChangeDropDownList.bind(this)}/>
	      	<InputText options={this.state.inputOption.input_text} onChange={this.handleChangeInputText.bind(this)}/>
	      </div>
	    );
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
