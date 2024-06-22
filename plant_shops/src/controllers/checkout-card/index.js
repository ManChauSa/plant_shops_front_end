import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CheckoutCard = () => {
    const order = useSelector(state => state.order);
    const user =  useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialData = { paymentMethod: 0, cardNumber: "", expirationDate: "", cvv: "",  lastName: "", firstName: "", phoneNumber: ""};
    const [paymentInfor, setPaymentInfor] = useState(initialData);

    useEffect(()=>{
        if (!user) {
            navigate("/login");
            return;
        }
        if (!order.items) {
            navigate("/cart");
        }
        
        if (order.paymentInfor) {
            setPaymentInfor(order.paymentInfor);
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "createOrder", order: {...order,paymentInfor: paymentInfor}});
        navigate("/checkout/confirmation");
    }

    const handleFieldChanges = (e) => {
        setPaymentInfor({ ...paymentInfor, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2 id="cardTitle" class="text-center">Please Provide Your Card</h2>
                <Row>                  
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label>Type</Form.Label>
                            <div >
                           <Form.Check // prettier-ignore
                                type="radio"
                                value="0"
                                name="type"
                                id="CREDIT_CARD"
                                inline
                                onChange={handleFieldChanges}
                                checked={paymentInfor.type === "0"}
                                label="CREDIT CARD"
                            />

                            <Form.Check // prettier-ignore
                                type="radio"
                                value="1"
                                name="type"
                                inline
                                id="CASH_DELIVERY"
                                onChange={handleFieldChanges}
                                checked={paymentInfor.type === "1"}
                                label="CASH DELIVERY"
                            />
                           </div>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="number" name="cardNumber" value={paymentInfor.cardNumber} onChange={handleFieldChanges} placeholder="Enter card number" />
                        </Form.Group>
                    </Col>
                  
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control type="text" name="expirationDate" value={paymentInfor.expirationDate} onChange={handleFieldChanges} placeholder="MM-YY" />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="number" name="cvv" value={paymentInfor.cvv} onChange={handleFieldChanges} placeholder="CVV" />
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={paymentInfor.lastName} onChange={handleFieldChanges} placeholder="Last Name" />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" value={paymentInfor.firstName} onChange={handleFieldChanges} placeholder="First name" />
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phoneNumber" value={paymentInfor.phoneNumber} onChange={handleFieldChanges} placeholder="Phone" />
                        </Form.Group>
                    </Col>
                </Row>
                <Button id="cardNext" className="btn btn-dark" size="lg" type="submit" variant="dark">Next</Button>
            </Form>


        </Container>
    );
}

