class IndecisionApp extends React.Component {
  render(){
    const title = "Indecision App";
    const subtitle = "What're you gonna do?";
    const options = ['Eat Chocolate', 'Make pie', 'Clean room'];
    return (
      <div>
        <Header title={title} subtitle={subtitle}/>
        <Action/>
        <Options options={options} />
        <AddOption/>
      </div>
    )
  }
}
class Header extends React.Component {
  render(){
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    )
  }
}

class Action extends React.Component {
  handlePick() {
    alert("Pick handled")
  }
  render(){
    return (
      <div>
        <button onClick={this.handlePick}>What should I do?</button>
      </div>
    )
  }
}


class Options extends React.Component {
  constructor(props){
    super(props);
    this.handleRemove = (e) => { alert(this.props.options)}
  }
  render(){
    return (
      <div>
        <button onClick={this.handleRemove}>Remove All</button>
        {this.props.options.map( option => <Option key={option} optionText={option} /> )}
      </div>
    )
  }
}

class AddOption extends React.Component {
  handleAddOptions(e){
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    if(option) alert(option);
  }
  render(){
    return (
      <div>
        <form onSubmit={this.handleAddOptions.bind(this)}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}

class Option extends React.Component {
  render(){
    return (
      <div>
        {this.props.optionText}
      </div>
    )
  }
}




ReactDOM.render(<IndecisionApp/>,document.getElementById('app'));
