import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api";

export const Login = () => {
    const initialData = { userName: "", password: "" };
    const [user, setUser] = useState(initialData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { PostClient } = useAPI();

    const login = async (user) => {
        const response = await PostClient("/auth/signin", user);
        if (response.status == 200) {
            dispatch({ type: "login", user: response.data })
            navigate("/");
        }
    }

    const submitLogin = async (e) => {
        e.preventDefault();

        await login(user);
    }

    const handleFieldChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (

        <Container className="box">
            <Row><Col className="text-center"><h2>Log In</h2></Col></Row>
            <Row>

                <Col md={4}></Col>
                <Col md={4}>
                    <Form onSubmit={submitLogin}>
                        <Form.Group className="mb-3" controlId="formBasicUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter user name" name="userName" value={user.userName} onChange={handleFieldChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleFieldChange} />
                        </Form.Group>

                        <Button id="login" className="btn btn-dark" variant="dark" type="submit">
                            Login
                        </Button>
                    </Form>

                </Col>
                <Col md={4}></Col>

            </Row>
        </Container>

    );
}


