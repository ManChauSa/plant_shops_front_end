import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAPI from "../../../api";
export const OrderItem = ({ order, reloadFunction }) => {
    const user = useSelector(state => state.user);
    const { PutClient } = useAPI();
    const cancelOrder = async (e) => {
        if (await cancel(e.target.value))
            reloadFunction();
    }

    const cancel = async (orderId) => {
        const response = await PutClient(`/order/${orderId}/cancel`, null, user.token);
        return response.status === 204;
    }

    return (
        <Container className="cartitem">
            <Row >
                <Col lg={12}>
                    <Card.Title>ORDER STATUS:
                        {order.status === "CANCELLED" ? (
                            <Button className="disabled" variant="outline-danger">CANCELLED</Button>
                        ) : <Button className="disabled" variant="outline-primary">{order.status}</Button>}
                    </Card.Title>                   
                    <Card.Text>
                        Total: <span className="text-success">${order.total}</span>
                    </Card.Text>                  
                    <Card.Text>
                        Order Date: <span className="text-success">${order.createdDate}</span>
                    </Card.Text>     
                    <Card.Text>
                        Ship Date: <span className="text-success">${order.shipDate}</span>
                    </Card.Text>             
                </Col>
            </Row>
            {order.status === "ORDERED" ? (
                    <Col lg={1}>
                        <Button
                            type="button"
                            value={order.orderId}
                            onClick={cancelOrder}
                            className="mt-auto btn btn-danger non-border-button">
                            CANCELLED
                        </Button>
                    </Col>
                ) : ""}
        </Container>

    )
}