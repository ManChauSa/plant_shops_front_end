import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { host } from "../../api";
import useAPI from "../../api";
import { useSelector } from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css';

export const SellerCell = ({ seller, reloadAfterDelete }) => {
    const navigate = useNavigate();
    const { PutClient } = useAPI();
    const user = useSelector(state => state.user);

    const approveSeller = (e) => {
        e.preventDefault();
        approve(e.target.value);
    }
    const approve = async (sku) => {
        const response = await PutClient(`/seller/approve/${sku}`, null, user.token);
        if (response.status == 201) {
            reloadAfterDelete();
        }
    }
    return (
        <Card id="productItem" className="seller-card d-flex flex-column">
            {/* <Card.Img className ="product-card-image flex-grow-1" variant="top" src={host + "/api/images/" + product.images[0]} /> */}
            <Card.Body className="d-flex flex-column">
                <h5 name="product-name" className="card-text">
                    Name: {seller.name}
                </h5>
                <Card.Text name="email" className="limited-height-text">
                    Name: {seller.email}
                </Card.Text>
                <Card.Text name="phone" className="limited-height-text">
                    Phone: {seller.phone}
                </Card.Text> 
                <div className="d-flex justify-content-between mt-auto">                        
                    <Button id={`delete-button-${seller.userId}`} onClick={approveSeller} value={seller.userId} className="btn btn-success non-border-button">Approve</Button>
                </div>          
            </Card.Body>
        </Card>
    )
}
