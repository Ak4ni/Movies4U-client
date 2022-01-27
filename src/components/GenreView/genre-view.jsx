import React from "react";
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
              <Button className="returnButton" variant="dark">
                Return
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  }
}
