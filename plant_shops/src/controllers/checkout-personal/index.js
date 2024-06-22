import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CheckoutPersonalInfo = () => {
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.order);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState({});

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!order.items) {
            navigate("/cart");
        }
        const initialData = { addressStreet: "", addressLine1: "", city: "", state: ""}
        setAddress(initialData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "createOrder", order: { ...order, address: address } });
        navigate("/checkout/card");
    }

    const handleFieldChanges = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2 id="addressTitle" className="text-center">Fill your address</h2>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formAddressStreet">

                            <Form.Label>Address 1</Form.Label>
                            <Form.Control type="text" name="addressStreet" value={address.addressStreet} onChange={handleFieldChanges} placeholder="Enter Address 1" />
                        </Form.Group>


                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formAddressLine1">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control type="text" name="addressLine1" value={address.addressLine1} onChange={handleFieldChanges} placeholder="Enter Address 2" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" value={address.city} onChange={handleFieldChanges} placeholder="Enter City" />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicState">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" value={address.state} onChange={handleFieldChanges} placeholder="Enter State" />
                        </Form.Group>

                    </Col>
                </Row>
                <Button id="add-card" className="btn btn-dark" size="lg" type="submit" variant="dark">Add Payment Card</Button>
            </Form>


        </Container>
    );
}

