import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './components/AddOption';
import Option from './components/Option';
import Header from './components/Header';
import Action from './components/Action';
import Options from './components/Options';
import IndecisionApp from './components/IndecisionApp';

Header.defaultProps = {
  title: "Indecision"
};

ReactDOM.render(
  <IndecisionApp options={[]} />,
  document.getElementById("app")
);
