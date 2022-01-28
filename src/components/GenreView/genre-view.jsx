import React from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { Genre } = this.props;
    return (
      <>
        <Card bg="secondary" text="light" border="light" align="center">
          <Card.Body>
            <Card.Title>Genre</Card.Title>
            <div className="genre-name">
              <span className="label">Name:</span>
              <span className="value">{Genre.Name}</span>
            </div>
            <div className="genre-description">
              <span className="label">Description:</span>
              <span className="value">{Genre.Description}</span>
            </div>
            <Link to={`/`}>
              <Button className="returnButton" variant="">
                Return
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  }
}
GenreView.propTypes = {
  Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
};