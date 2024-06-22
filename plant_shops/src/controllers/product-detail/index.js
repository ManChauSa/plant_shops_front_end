import React, { useEffect, useState } from "react";
import useAPI from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { ImageGallery, Review, ReviewList } from "./components";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

export const ProductDetail = () => {
    const params = useParams();
    const { GetClient } = useAPI();
    const [product, setProduct] = useState();
    const [quantities, setQuantities] = useState(0);
    const [totalPrice, setTotalPrice] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [select, setSelect] = useState(false);
    useEffect(() => {
        const loadProduct = async (sku) => {
            const response = await GetClient("/product/" + sku);
            if (response.status === 200) {
                setProduct(response.data);
                setTotalPrice(response.data.basePrice);
            }
        }

        loadProduct(params.sku);

    }, [params])

    const calculateTotalPrice = (product, quantities) => {
        let price = product.price;
        setTotalPrice(price * quantities);
    }

    const addToCart = (e) => {
        e.preventDefault();
        dispatch({ type: "cart", item: { productId: product.productId, productName: product.productName, price: product.price, quantities: quantities, totalPrice: totalPrice } })
        navigate("/cart");
    }

    const numberChange = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        if (value) {
            setSelect(true);
            setQuantities(value);
            calculateTotalPrice(product, value);
        } else {
            setSelect(false);
        }
    }
    return (
        <div className="product">
            {product && (
                <Container>
                    <Row className="product-header">
                        <div>
                            <h1 id="productName">{product.productName.toUpperCase()}</h1>
                        </div>
                        <div>
                            <h3 className="text-danger" id="rentPrice">Price: $ {product.price}</h3>
                        </div>
                        <div>
                            <h4 className={product.inventoryCount > 0 ? "text-info" : "text-secondary"} id="rentPrice">Stock: {product.inventoryCount}</h4>
                        </div>
                        <div>
                            <p className="text-success" id="carDescription">{product.description}</p>
                        </div>
                    </Row>

                    <Row>
                        <ImageGallery images={product.images} firstHalf={true} />
                        <ImageGallery images={product.images} firstHalf={false} />
                    </Row>
                </Container>
            )}

            {product && product.inventoryCount > 0 && (
                <Container>
                    <Row className="text-center">
                        <h5 id="title" className="card-title">HOW MANY DO YOU WANT TO BUY?</h5>

                        <Col lg={5} />
                        <Col lg={2} className="mb-6 mb-lg-0 text-center select"  >
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" onChange={numberChange} />
                        </Col>
                        <Col lg={5} />
                    </Row>
                    <Row>
                        <Col xs={12} className="mb-6 mb-lg-0 text-center total" >
                            <h4 id="total" className="card-title">Total Price: <span className="text-success">${totalPrice}</span> </h4>
                        </Col>

                        <Col lg={3} />
                        <Col lg={6} className=" gap-2 text-center addcart">
                            <Button id="addCartButton" className="btn btn-dark" onClick={addToCart} disabled={!select} size="lg" variant="dark">Add To Cart</Button>
                        </Col>
                        <Col lg={3} />
                    </Row>
                </Container>
            )}


            <Container>
                <Row>
                    <Review />
                </Row>
            </Container>

        </div>
    )

}
