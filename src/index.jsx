import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import { MainView } from './components/MainView/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class Movies4UApplication extends React.Component {
  render() {
    return (
      <container>   
         <MainView />
      </container>
     
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(Movies4UApplication), container);