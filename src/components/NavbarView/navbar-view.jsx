import React from "react";
import {Container, Navbar, Nav, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './navbar-view.scss'

export function Menubar({user}) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }
    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };
    return (


        <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">Movies4U</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="resposinve-navbar-nav">
                    <Nav className="ml-auto">
                        {
                        isAuth() && (
                            <Nav.Link href={
                                `/users/${user}`
                            }>
                                {user}</Nav.Link>
                        )
                    }
                        {
                        isAuth() && (
                            <Button variant="link"
                                onClick={
                                    () => {
                                        this.onLoggedOut()
                                    }
                            }>Logout</Button>
                        )
                    }
                        {
                        ! isAuth() && (
                            <Nav.Link href="/">Sign in</Nav.Link>
                        )
                    }
                        {
                        ! isAuth() && (
                            <Nav.Link href="/register">Sign up</Nav.Link>
                        )
                    } </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}