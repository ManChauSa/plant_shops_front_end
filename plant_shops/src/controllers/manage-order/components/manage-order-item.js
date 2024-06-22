import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import useAPI from "../../../api";
import { CartCell } from "../../../components";

export const ManageOrderItem = ({ order, reloadFunction }) => {
    const user = useSelector(state => state.user);
    const { PutClient } = useAPI();

    const shippedOrder = async (e) => {
        if (await ship(e.target.value))
            reloadFunction();
    }

    const ship = async (orderId) => {
        const response = await PutClient(`/order/${orderId}/ship`, null, user.token);
        return response.status === 204;
    }

    const deliveredOrder = async (e) => {
        if (await deliver(e.target.value))
            reloadFunction();
    }

    const deliver = async (orderId) => {
        const response = await PutClient(`/order/${orderId}/delivery`, null, user.token);
        return response.status === 204;
    }

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
                <Card.Title>
                    ORDER STATUS:
                    {(() => {
                        switch (order.status) {
                            case "ORDERED":
                                return <Button className="disabled" variant="outline-danger">ORDERED</Button>;
                            case "SHIPPED":
                                return <Button className="disabled" variant="outline-primary">SHIPPED</Button>;
                            case "DELIVERED":
                                return <Button className="disabled" variant="outline-success">DELIVERED</Button>;
                            case "CANCELLED":
                                return <Button className="disabled" variant="outline-secondary">CANCELLED</Button>;
                            default:
                                return <Button className="disabled" variant="outline-dark">UNKNOWN</Button>;
                        }
                    })()}
                </Card.Title>
                    <Card.Text>
                        Total: <span className="text-success">${order.total}</span>
                    </Card.Text>                  
                    <Card.Text>
                        Order Date: <span className="text-success">{order.createdDate}</span>
                    </Card.Text>     
                    <Card.Text>
                        Ship Date: <span className="text-success">{order.shipDate}</span>
                    </Card.Text>
                </Col>
                {order.orderItems.map(e => (
                    <Col lg={12} key={e.productId}>
                        <CartCell item={e} deleteF={null} onNumberChange={null} />
                    </Col>
                ))}
            </Row>
            <Row>
                {order.status === "ORDERED" ? (
                    <Col lg={1}>
                        <Button
                            type="button"
                            value={order.orderId}
                            onClick={shippedOrder}
                            className="mt-auto btn btn-primary non-border-button">
                            SHIPPED
                        </Button>
                        <Button
                            type="button"
                            value={order.orderId}
                            onClick={cancelOrder}
                            className="mt-auto btn btn-danger non-border-button">
                            CANCELLED
                        </Button>
                    </Col>
                ) : ""}

                {order.status === "SHIPPED" ? (
                    <Col lg={1}>
                        <Button
                            type="button"
                            value={order.orderId}
                            onClick={deliveredOrder}
                            className="mt-auto btn btn-success non-border-button">
                            DELIVERED
                        </Button>
                    </Col>
                ) : ""}
            </Row>

        </Container>

    )
}