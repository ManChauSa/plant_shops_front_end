import React, { useState, useEffect } from "react";
import useAPI from "../../../../api";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCell } from "../../../../components";

export const ProductCollection = ({title, apiPath}) => {

    const [products, setProducts] = useState([]);

    const { GetClient } = useAPI();

    useEffect(() => {
        async function fetchData() {
            const response = await GetClient(apiPath);
            if (response.status === 200) {
                setProducts(response.data);
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <Row><Col className="text-center"><h2 id="collection-title">{title}</h2></Col></Row>
            <Row>
                {products.map((product) => (
                    <Col key={product.productId} sm={3}>
                        <ProductCell product={product} isManage={false}/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}