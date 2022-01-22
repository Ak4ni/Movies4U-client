import React,{useState} from "react";

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ]= useState('');
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
    }
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
                                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                                </Form.Group>
                                <Button variant="outline-light" type="submit" onClick={handleSubmit}>
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
