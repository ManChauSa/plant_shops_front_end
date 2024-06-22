import { Button, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartCell } from "../../components";
import "./index.css";

export const CartPage = () => {
    const carts = useSelector(state => state.carts);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [total, setTotal] = useState(0);
    const navigate = useNavigate();


    const checkout = (e) => {
        e.preventDefault();
        if (carts.length == 0) {
            navigate("/product-list");
            return;
        }
        const order = { items: carts, email: user.email, orderStatus: "PLACED", total: total, address: "" };
        dispatch({ type: "createOrder", order: order });
        navigate("/checkout/info");
    }

    const onNumberChange = (oldItem, newItem) => {
        dispatch({ type: "updateCart", item: oldItem, newItem: newItem });
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        let temp = carts.map(e => e.totalPrice).reduce((a, b) => a + b, 0);
        setTotal(temp);

    }, [carts])

    const deleteF = (item) => {
        dispatch({ type: "deleteCartItem", item: item })
    }

    return (
        <Container>
            <Row className=" text-center">
                <div>
                    <h1 id="cartTitle">{carts.length == 0 ? "NO CART ITEMS" : "SHOPPING CART"}</h1>
                </div>
            </Row>
            <Row>
                {carts.map(e => (
                    <Col lg={12} key={e.productId} className="cart-item">
                        <CartCell item={e} deleteF={deleteF} onNumberChange={onNumberChange} />
                    </Col>
                ))}
            </Row>

            <Row>
                <Col xs={12} className="mb-6 mb-lg-0 text-center total" >
                    {carts.length !== 0 &&
                        <h4 id="total" className="card-title">Total Price: <span className="text-success">${total}</span> </h4>
                    }
                </Col>

                <Col lg={3} />
                <Col lg={6} className=" gap-2 text-center addcart">
                    <Button id="addAddress" className="btn btn-dark" onClick={checkout} size="lg" variant="dark">{carts.length == 0 ? "Shop Now" : "Add Address"}</Button>
                </Col>
                <Col lg={3} />

            </Row>


        </Container>

    )
}

