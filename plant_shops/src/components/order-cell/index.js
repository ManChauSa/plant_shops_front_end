import { Card, ListGroup } from "react-bootstrap";
import { CartCell } from "../cart-cell";

import "./index.css";

export const OrderCell = ({ order }) => {
    return (
        <Card >
            <Card.Body>
                <Card.Title name="status">ORDER STATUS: {order.status}</Card.Title>
                <Card.Text name="orderTotal">
                    Total: <span className="text-success">${order.total}</span>
                </Card.Text>
                {order.orderItems.map(e => (
                    <ListGroup className="order-list-group" key={e.product.productId}>
                        <ListGroup.Item>
                            <CartCell item={e} deleteF={null} onNumberChange={null} onReview={true} />
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </Card.Body>

        </Card>

    )
}