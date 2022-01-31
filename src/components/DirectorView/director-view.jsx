import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { Director } = this.props;

    return (
      <Container>
        <br />
        <Card bg="secondary" text="light" border="light" align="center">
          <Card.Body>
            <Card.Title>Director</Card.Title>
            <div>
              <span className="label">Name:</span>
              <span className="value">{Director.Name}</span>
            </div>
            <div>
              <span className="label">Bio:</span>
              <span className="value">{Director.Bio}</span>
            </div>
            <div>
              <span className="label">Born:</span>
              <span className="value">{Director.Birthyear}</span>
            </div>
            <div>
              <span className="label">Death:</span>
              <span className="value">{Director.Deathyear}</span>
            </div>
            <br />
            <div className="backButton">
              <Link to={`/`}>
                <Button className="returnButton" variant="">
                  Back
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
