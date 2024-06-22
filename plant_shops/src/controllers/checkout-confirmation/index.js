import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import useAPI from "../../api";
import { useNavigate } from "react-router-dom";
import { CartCell } from "../../components";
import "./index.css";
import { useEffect } from "react";


export const CheckoutConfirmation = () => {
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.order);
    const { PostClient } = useAPI();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (!user) {
            navigate("/login");
            return;
        }
        if (!order.items) {
            navigate("/cart");
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await PostClient("/order", order, user.token);
        dispatch({ type: "clearOrder" });
        navigate("/orders");
    }

    return (
        <Container>
            <Row className=" text-center">
                <div>
                    <h1 id="confirmTitle">CHECKOUT CONFIRMATION</h1>
                </div>
            </Row>

            <Row>
                <Col xs={12} >
                    <Button
                        onClick={handleSubmit}
                        id="cButtonFinal"
                        size="lg"
                        type="submit"
                        variant="dark"
                        className="btn btn-primary btn-lg btn-block">
                        Checkout
                    </Button>
                </Col>
            </Row>

            <Row>

                {order.items &&
                    <Col lg={12} >
                        <Card >
                            <Card.Body>
                                <h3 className="text-center">
                                    Items
                                </h3>
                                <Card.Text id="checkoutTotal">
                                    Total: <span className="text-success">${order.total}</span>
                                </Card.Text>
                                {order.items.map(e => (
                                    <ListGroup className="order-list-group" key={e.productId}>
                                        <ListGroup.Item>
                                            <CartCell item={e} deleteF={null} onNumberChange={null} onReview={false} />
                                        </ListGroup.Item>
                                    </ListGroup>
                                ))}
                                <h3 id="checkoutAddressSubtitle" className="text-center">
                                    Address
                                </h3>
                                <ListGroup className="order-list-group">
                                    <ListGroup.Item id="checkoutAddress1">
                                        Address 1: {order.address.addressStreet}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutAddress2">
                                        Address 2: {order.address.addressLine1}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutAddressCity">
                                        City: {order.address.city}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutAddressState">
                                        State: {order.address.state}
                                    </ListGroup.Item>
                                </ListGroup>

                                <h3 id="checkoutCardSubtitle" className="text-center">
                                    Card
                                </h3>
                                <ListGroup className="order-list-group">
                                    <ListGroup.Item id="checkoutCardType">
                                        Type: {order.paymentInfor.type === 0 ? "CREADIT CARD" : "CASH DELIVERY"}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutNumber">
                                        Number: {order.paymentInfor.cardNumber}
                                    </ListGroup.Item>  
                                    <ListGroup.Item id="checkoutValidCode">
                                        CVV: {order.paymentInfor.cvv}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutValidDate">
                                        Expired Date: {order.paymentInfor.expirationDate}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutValidFirstName">
                                        First Name: {order.paymentInfor.firstName}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutValidLastName">
                                        Last Name: {order.paymentInfor.lastName}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutValidPhone">
                                        Phone: {order.paymentInfor.phoneNumber}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                }
            </Row>


        </Container>
    )
}

