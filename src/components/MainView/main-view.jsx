import React from "react";
import axios from "axios";

import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { report } from "process";


export class MainView extends React.Component{
    constructor(){
        super();
        this.state = {
          movies: [
            { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. but his tragic past may doom the project and his team to disaster.', ImagePath:'https://images-na.ssl-images-amazon.com/images/S/apesafeframe/ape/sf/desktop/DAsf-1.50.b9438f1.js'},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', ImagePath: 'https://images-na.ssl-images-amazon.com/images/S/apesafeframe/ape/sf/desktop/DAsf-1.50.b9438f1.js'},
            { _id: 3, Title: 'Gladiator', Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery', ImagePath: '"https://images-na.ssl-images-amazon.com/images/S/apesafeframe/ape/sf/desktop/DAsf-1.50.b9438f1.js"'}
          ],
          selectedMovies:null
        };
    }
    
    componentDidMount(){
        axios.get('https://themovies4u.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
                
                });
            }
        )
    }
    
    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
    }
    
    render() {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0) 
    return <div className="main-view" />;

    return (
        <div className="main-view">
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