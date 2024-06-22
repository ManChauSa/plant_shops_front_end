import { Container, Row, Col, Card, Form, Image, Button } from "react-bootstrap";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const CartCell = ({ item, deleteF, onNumberChange, onReview = null }) => {
    const navigate = useNavigate();

    const numberChange = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        const unitPrice = item.totalPrice / item.quantities;

        if (value) {
            let temp = { ...item, quantities: value, totalPrice: unitPrice * value }
            onNumberChange(item, temp);
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteF(item);
    }

    const handleReview = (e) => {
        e.preventDefault();
        navigate("/product/"+ e.target.value);
    }

    return (
        <Container className="cartitem">
            <Row >
                <Col lg={3}>
                    <Image rounded className="w-100" src="/default_plant_image.png" />
                </Col>
                <Col lg={6}>
                    <div>
                        <Card.Title name="cartTitle">{item.productName.toUpperCase()}</Card.Title>
                        <Card.Text>
                            Total Price: <span className="text-success">${item.totalPrice}</span>
                        </Card.Text>
                    </div>
                </Col>
                <Col lg={3}>
                    <div className="mb-6 mb-lg-0 text-center cart-select"  >
                        <Form.Control type="number" onChange={numberChange} disabled={!onNumberChange} value={item.quantities}/>
                    </div>
                    <div className="button-box">
                        {deleteF &&
                            <Button id="cartCellDelete" value={item.productId} rounded variant="danger" onClick={handleDelete} >Delete</Button>
                        }

                        {onReview &&
                            <Button value={item.productId} rounded variant="light" onClick={handleReview} >Review</Button>
                        }
                    </div>
                </Col>
            </Row>

        </Container>

    )
}