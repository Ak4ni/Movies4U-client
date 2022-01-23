import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onRegistration(username);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Register now!</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        value={username} 
                                        onChange={e => setUsername(e.target.value)} 
                                        placeholder="Enter username" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control 
                                        type="password" 
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)} 
                                        minlength="8" 
                                        placeholder="Your password must be 8 or more characters" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)} 
                                        placeholder="Enter email" />
                                    </Form.Group>

                                    <Button variant="outline-light" type="submit" onClick={handleSubmit}>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};