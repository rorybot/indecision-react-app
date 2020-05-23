class IndecisionApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options: ['Eat Chocolate', 'Make pie', 'Clean room']
    }
    this.handleDeleteOptions = () => {
      this.setState(()=>{
        return {
          options: []
        }
      })
    }
    this.handlePick = () => {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
    }
    this.handleAddOptions = (option) => {
      if(!option) return 'Enter valid value to add item';
      if(this.state.options.indexOf(option) > -1) return 'This option already exists'
      this.setState((prevState)=>{
        return {
          options: prevState.options.concat([option])
        }
      })
    }
  }
  render(){
    const title = "Indecision App";
    const subtitle = "What're you gonna do?";
    return (
      <div>
        <Header title={title} subtitle={subtitle}/>
        <Action
          hasOptions={this.state.options.length}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption
          handleAddOptions={this.handleAddOptions}
        />
      </div>
    )
  }
}


const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  )
}
const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  )
}
const Option = (props) => {
  return (
    <div>
      {props.optionText}
    </div>
  )
}
const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>
        Remove All
      </button>
      { props.options.map(option => <Option key={option} optionText={option} />)}
    </div>
  )
}

class AddOption extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: undefined
    };
    this.handleAddOption = (e) => {
      e.preventDefault();
      const option = e.target.elements.option.value.trim();
      const error = this.props.handleAddOptions(option);

      this.setState(()=>{
        return { error };
      });
    }
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={(e)=>this.handleAddOption(e)}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}





ReactDOM.render(<IndecisionApp/>,document.getElementById('app'));
