import React from "react";
import axios from "axios";
import "./main-view.scss";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from "../../actions/action";
import { LoginView } from "../LoginView/login-view";
import MoviesList from "../MoviesList/movie-list";
import { MovieView } from "../MovieView/movie-view";
import { DirectorView } from "../DirectorView/director-view";
import { GenreView } from "../GenreView/genre-view";
import { RegistrationView } from "../RegistrarionView/registration-view";
import { NavbarView } from "../NavbarView/navbar-view";
import { Container, Col, Row } from "react-bootstrap";
import { ProfileView } from "../ProfileView/profile-view";

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    // Initial state is set to null
    this.props = props;
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  getUserData(token) {
    console.log("get user data");
    axios
      .get(
        "https://themovies4u.herokuapp.com//users/" +
          localStorage.getItem("user"),
        {
          // axios.get('http://localhost:5000/users/' + localStorage.getItem('user'), {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("user", response.data);
        // Assign the result to the state
        this.setState({ userData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMovies(token) {
    axios
      .get(`https://themovies4u.herokuapp.com/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        console.log("setMovies: ", response.data);
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  render() {
    const { user } = this.state;
    const { movies } = this.props;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/login"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                }

                return (
                  <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                );
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                }

                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                if (movies.length === 0) {
                  return <div className="main-view" />;
                }

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/profile"
              render={({ history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                return (
                  <Col md={8}>
                    <ProfileView
                      
                      
                      movies={movies}
                      onBackClick={() => history.goBack()}
                      onLoggedOut={() => this.onLoggedOut}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                if (movies.length === 0) {
                  return <div className="main-view" />;
                }

                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                      movies={movies.filter(
                        (movie) => movie.Genre.Name === match.params.name
                      )}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                      movies={movies.filter(
                        (movie) => movie.Director.Name === match.params.name
                      )}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
