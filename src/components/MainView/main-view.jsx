import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './main-view.scss';
import { Row, Col } from 'react-bootstrap';

import { LoginView } from '../LoginView/login-view';
import { RegistrationView } from '../RegistrarionView/registration-view';
import { MovieCard } from '../MovieCard/movie-card';
import { MovieView } from '../MovieView/movie-view';

export class MainView extends React.Component{
    constructor(){
        super();
        /* Initial state is set to null  */
        this.state = {
          movies: [],
          selectedMovies:null,
          user:null
        };
    }
    
    componentDidMount(){
        axios.get('https://themovies4u.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
                
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    /* When a movie is clicked, this function is invoked and updates the state of 
    the 'selectedMovie' *property to that movie*/
    setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
        });
    }
     /* User registers */
    onRegistration(registration) {
        this.setState({
          registration,
        });
    }

    /* When a user successfully logs in, this function updaates the 'user' property 
    in state to that *particular user */
    onLogegedIn(user) {
        this.setState({
            user
        });
    }
    
    render() {
        const { movies, selectedMovie, user, registration } = this.state;
        if (!registration) 
        return (<RegistrationView onRegistration={(registration) => this.onRegistration(registration)} />);

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
            if (!user) 
            return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        
        
        // before the movies have been loaded
            if (movies.length === 0) return <div className='main-view' />
            return (
                <Row className="main-view justify-content-md-center">
                  {selectedMovie
                    ? (
                      <Col md={8}>
                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                      </Col>
                    )
                    : movies.map(movie => (
                      <Col md={3}>
                        <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                      </Col>
                    ))
                  }
                </Row>
              );
           }
        }
