import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './login-view.scss';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ]= useState('');
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://themovies4u.herokuapp.com/login', {
          Username: username,
          Password: password
        })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
      };
      
    return(
        <Container>
        <Row>
            <Col>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Please login</Card.Title>
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="Enter username" />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter password" />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    </Container>
);
}

LoginView.propTypes = {
user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}),
onLoggedIn: PropTypes.func.isRequired,
};

