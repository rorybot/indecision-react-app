class IndecisionApp extends React.Component {
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


IndecisionApp.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle && props.subtitle}</h2>
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision"
};
const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
};
const Option = props => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={() => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
};
const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Enter an option to get started</p>}
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
    this.handleAddOption = e => {
      e.preventDefault();
      const option = e.target.elements.option.value.trim();
      const error = this.props.handleAddOptions(option);

      this.setState(() => ({ error }));

      if(!error) e.target.elements.option.value = '';

    };
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={e => this.handleAddOption(e)}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <IndecisionApp options={[]} />,
  document.getElementById("app")
);
