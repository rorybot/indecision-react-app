

let template = React.createElement(
  "h1",
  { id: "someid" },
  "Something new"
);

let appRoot = document.getElementById('app');

ReactDOM.render(template,appRoot)
