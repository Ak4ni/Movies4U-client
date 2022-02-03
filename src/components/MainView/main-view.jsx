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
import { NavbarView } from "../NavbarView/navbar-view"
import { Container, Col, Row } from 'react-bootstrap';
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
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ 
        user: localStorage.getItem("user") 
    });
      this.getMovies(accessToken);
    }
  }
  /* When a user successfully logs in, this function updates the 'user' property in state to that *particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.props.getUser(authData.user.Username);
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
    const { movies, user } = this.state;

    return (
      <Router>
        <NavbarView user={user} />
       <Container>
        <Row className="main-view justify-content-md-center">
          <Routes>
          <Route exact path='/' element={<LoginView />}
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;

              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={this.movie} onMovieClick={() => {}} />
                </Col>
              ));
            }}
          />


          <Route
            path="/movies/:movieId" element={<MovieView />}
            render={({ match, history }) => {
              if (!user) return;
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
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
              if (!user) return;
              <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>;

              if (movies.length === 0) return <div className="main-view" />;
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
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
              if (user) return <Redirect to="/" />;
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
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
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
        </Container>
      </Router>
    );
  }
}
