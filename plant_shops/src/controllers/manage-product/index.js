import React, { useEffect, useState } from "react";
import "./index.css"
import { useSelector } from "react-redux";
import { ProductCell } from "../../components";
import useAPI from "../../api";
import { Container, Row, Col } from "react-bootstrap";
export const ManageProduct = () => {

    const [products, setProducts] = useState([]);
    const user = useSelector(state => state.user);
    const { GetClient } = useAPI();

    async function fetchData() {
        const response = await GetClient("/product/seller/products", user.token);
        if (response.status === 200) {
            setProducts(response.data);
        }
    }

    useEffect(() => {       
        fetchData();
    }, []);

    const reloadAfterDelete = () => {
        fetchData();
    }
    return (
        <Container>
            <Row><Col className="text-center"><h2>Your Products</h2></Col></Row>
            <Row>
                {products.map((product) => (
                    <Col key={product.productId} sm={4}>
                        <ProductCell product={product} isManage={true} reloadAfterDelete = {reloadAfterDelete}/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}