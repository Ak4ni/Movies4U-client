import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import {Container, Row, Col, Button} from 'react-bootstrap';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const {movie, onBackClick} = this.props;

        return (
            <Container fluid className="moviesContainer">
                <Row>
                    <Col>
                        <div className="movie-view">
                            <div className="movie-poster">
                                <img src={
                                    movie.ImagePath
                                }/>
                            </div>
                            <div className="movie-title">
                                <span className="label">Title:
                                </span>
                                <span className="value">
                                    {
                                    movie.Title
                                }</span>
                            </div>
                            <div className="movie-description">
                                <span className="label">Description:
                                </span>
                                <span className="value">
                                    {
                                    movie.Description
                                }</span>
                            </div>
                            <div className="movie-genre">
                                <span className="label">Genre:
                                </span>
                                <span className="value">
                                    {
                                    movie.Genre.Name
                                }</span>
                            </div>
                            <div className="movie-director">
                                <span className="label">Director:
                                </span>
                                <span className="value">
                                    {
                                    movie.Director.Name
                                }</span>
                            </div>

                            <Button variant="outline-light"
                                onClick={
                                    () => onBackClick(null)
                            }>Back</Button>

                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birthyear: PropTypes.string,
        Deathyear: PropTypes.string
      }),
      Featured: PropTypes.bool,
      ImagePath: PropTypes.string.isRequired
      }).isRequired,
      onBackClick: PropTypes.func.isRequired
  };
