import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api";

export const Signup = () => {
    const initialData = { email: "", password: "", name: "", role: "ROLE_BUYER" };
    const [user, setUser] = useState(initialData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { PostClient } = useAPI();

    const signup = async (user) => {
        const response = await PostClient("/auth/signup", user);
        if (response.status === 200) {
            dispatch({ type: "login", user: response.data });
            navigate("/");
        }
    }

    const submitSignup = async (e) => {
        e.preventDefault();
        await signup(user);
    }

    const handleFieldChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <Container className="box">
            <Row><Col className="text-center"><h2>Sign Up</h2></Col></Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Form onSubmit={submitSignup}>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name="name" value={user.name} onChange={handleFieldChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleFieldChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleFieldChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="role" value={user.role} onChange={handleFieldChange}>
                                <option value="ROLE_BUYER">BUYER</option>
                                <option value="ROLE_SELLER">SELLER</option>
                            </Form.Select>
                        </Form.Group>

                        <Button id="signupButton" variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
    );
}
