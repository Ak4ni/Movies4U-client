import React from "react";
import axios from "axios";

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link, Routes
} from "react-router-dom";

import { LoginView } from "../LoginView/login-view";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { DirectorView } from "../DirectorView/director-view";
import { GenreView } from "../GenreView/genre-view";
import { RegistrationView } from "../RegistrarionView/registration-view";
import { Navbar, Button, Col, Row } from 'react-bootstrap';
import "./main-view.scss";
import { ProfileView } from "../ProfileView/profile-view";

export class MainView extends React.Component {
    constructor(props) {
    super(props);
    /* Initial state is set to null  */
    this.state = {
      movies: [],
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://themovies4u.herokuapp.com/movies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem("user") });
      this.getMovies(accessToken);
    }
  }
  /* When a user successfully logs in, this function updaates the 'user' property in state to that *particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ users: authData.user.Username });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({ users: null });
  }

  render() {
    const { movies, users } = this.state;

    return (
      <Router>
        <Navbar bg="secondary" expand="lg" className="mb-4" sticky="top">
          <Navbar.Brand className="ml-4">
            <Link style={{ color: "" }} to={"/"}>
              Movies4U
            </Link>
          </Navbar.Brand>
          {users && (
            <Navbar.Collapse className="justify-content-end">
              <Link to={`/users/${users}`} className="mr-2">
                <Button variant="" style={{ color: "" }}>
                  Profile for {users}
                </Button>
              </Link>
              <Button
                onClick={() => this.onLoggedOut()}
                variant=""
                style={{ color: "" }}
              >
                Logout
              </Button>
            </Navbar.Collapse>
          )}
        </Navbar>
        <Row className="main-view justify-content-md-center">
          <Routes>
          <Route exact path='/' element={<LoginView />}
            render={() => {
              if (!users)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(users)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;

              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />


          <Route
            path="/movies/:movieId" element={<MovieView />}
            render={({ match, history }) => {
              if (!users) return;
              <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(users)} />
              </Col>;

              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name" element={<DirectorView />}
            render={({ match, history }) => {
              if (!users)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(users)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    Director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />


          <Route
            path="/genres/:name" element={<GenreView />}
            render={({ match, history }) => {
              if (!users) return;
              <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(users)} />
              </Col>;

              if (movies.length === 0) return <div className="main-view" />;
              if (!users)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(users)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    Genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/register" element={<RegistrationView />}
            render={() => {
              if (users) return <Redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/users" element={<ProfileView />}
            render={({ history }) => {
              if (!users)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(users)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col>
                  <ProfileView
                    user={this.state.user}
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          </Routes>
        </Row>
      </Router>
    );
  }
}
