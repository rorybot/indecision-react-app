import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    };
    this.handleDeleteOptions = () => {
      this.setState(() => ({ options: [] }));
    };
    this.handlePick = () => {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
    };
    this.handleAddOptions = (option) => {
      if (!option) return "Enter valid value to add item";
      if (this.state.options.indexOf(option) > -1)
        return "This option already exists";
      this.setState(prevState => ({
        options: prevState.options.concat([option])
      }));
    };
    this.handleDeleteOption = optionToRemove => {
      this.setState(prevState => ({
        options: prevState.options.filter(option => option !== optionToRemove)
      }));
    };
  }
  componentDidMount(){
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      options && this.setState(()=>({options}))
    } catch (e) {

    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options',json);
    }
  }
  render() {
    const subtitle = "What're you gonna do?";
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOptions={this.handleAddOptions} />
      </div>
    );
  }
}
