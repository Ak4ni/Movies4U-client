import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export class MovieCard extends React.Component {
  render() {
    let { movie, addToFavourites } = this.props;
    const currentUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(token, "token");

    const handleAddToFavourites = (e) => {
      e.preventDefault();
      console.log("add to Favourite movies");
      axios
        .post(
          `https://themovies4u.herokuapp.com/users/${currentUser}/movies/${movie._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        /* then call props.onRegistration(username) */
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("movie added to favourites");
          addToFavourites(movie._id);
        })
        .catch((e) => {
          console.log("error adding movie to favourites");
          alert("movie not added to favourites");
        });
    };

    return (
      <Card className="movie_card_background">
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          crossOrigin="anonymous"
          alt="Card image"
          className="card_image"
        />

        <Card.Body className="card-body">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="card-view">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Button
            className="button"
            variant="dark"
            type="submit"
            onClick={handleAddToFavourites}
          >
            Favorite
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
