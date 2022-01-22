import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './main-view.scss';

import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { report } from "process";



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

    /* When a user successfully logs in, this function updaates the 'user' property 
    in state to that *particular user */
    onLogegedIn(user) {
        this.setState({
            user
        });
    }
    
    render() {
    const { movies, selectedMovie } = this.state;

    // before the movies have been loaded
    if (movies.length === 0) 
    return <div className="main-view" />;

    return (
        <div className="main-view">
            {/* If the state of 'selectedMovie' is not null that selected movie will
            be return otherwise, all *movies will be returned */}
    
          {selectedMovie
            ? <MovieView 
            movie={selectedMovie} 
            onBackClick=
            {newSelectedMovie => 
                { this.setSelectedMovie(newSelectedMovie); }}/>
            
                : movies.map(movie => 
                    (<MovieCard 
                        key={movie._id} 
                        movie={movie} 
                        onMovieClick={newSelectedMovie => 
                            { this.setSelectedMovie(newSelectedMovie) }}/>
                        ))
                    }
                </div>
            );
        }
    }