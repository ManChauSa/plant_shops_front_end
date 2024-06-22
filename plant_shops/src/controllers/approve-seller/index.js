import React, { useEffect, useState } from "react";
import "./index.css"
import { useSelector } from "react-redux";
import { SellerCell } from "../../components";
import useAPI from "../../api";
import { Container, Row, Col } from "react-bootstrap";
export const ApproveSeller = () => {

    const [sellers, setSellers] = useState([]);
    const user = useSelector(state => state.user);
    const { GetClient } = useAPI();

    async function fetchData() {
        const response = await GetClient("/seller", user.token);
        if (response.status === 200) {
            setSellers(response.data);
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
            <Row><Col className="text-center"><h2>Unapproved Seller</h2></Col></Row>
            <Row>
                {sellers.map((seller) => (
                    <Col key={seller.userId} sm={12}>
                        <SellerCell seller={seller} reloadAfterDelete = {reloadAfterDelete}/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}