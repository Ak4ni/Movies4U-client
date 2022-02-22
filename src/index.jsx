import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";

import MainView from "./components/MainView/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const movies4UStore = createStore(
  moviesApp,
  window.REDEX_DEVTOOLS_EXTENSION && window.REDEX_DEVTOOLS_EXTENSION()
);

// Main component (will eventually use all the others)
class Movies4UApplication extends React.Component {
  render() {
    return (
      <Provider store={movies4UStore}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Find the root of Movies4U app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render Movies4U app in the root DOM element
ReactDOM.render(React.createElement(Movies4UApplication), container);

const cors = require("cors");
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'https://themovies4u.netlify.app/'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
