import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { MainView } from "./components/MainView/main-view";
import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
class Movies4UApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

// Find the root of myFlix app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render myFlix app in the root DOM element
ReactDOM.render(<Movies4UApplication />, container);
