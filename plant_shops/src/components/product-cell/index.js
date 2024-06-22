import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { host } from "../../api";
import useAPI from "../../api";
import { useSelector } from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css';

export const ProductCell = ({ product, isManage, reloadAfterDelete }) => {
    const navigate = useNavigate();
    const { DeleteClient } = useAPI();
    const user = useSelector(state => state.user);
    const open = (e) => {
        e.preventDefault();
        navigate("/product/"+ e.target.value);
    }
    const previewProduct = (e) => {
        e.preventDefault();
        navigate("/product/"+ e.target.value);
    }
    const editProduct = (e) => {
        e.preventDefault();
        navigate("/manage-product/product/"+ e.target.value);
    }
    const deleteProduct = (e) => {
        e.preventDefault();
        removeProduct(e.target.value);
    }
    const removeProduct = async (sku) => {
        const response = await DeleteClient(`/product/${sku}`, user.token);
        if (response.status == 204) {
            reloadAfterDelete();
        }
    }
    return (
        <Card id="productItem" className="product-card d-flex flex-column">
            {/* <Card.Img className ="product-card-image flex-grow-1" variant="top" src={host + "/api/images/" + product.images[0]} /> */}
            <Card.Img className ="product-card-image flex-grow-1" variant="top" src="/default_plant_image.png" />
            <Card.Body className="d-flex flex-column">
                <h5 name="product-name" className="card-text">
                    {product.productName}
                </h5>
                <Card.Text name="description" className="limited-height-text">
                    {product.description}
                </Card.Text>
                <h5 name="basePrice" className="card-text text-success">
                    {"$"}{product.price}
                </h5>
                <Card.Text name="seller" className="limited-height-text">
                    Sell by {product.seller.userName}
                </Card.Text>
                {
                    isManage ?
                        (
                            <div className="d-flex justify-content-between mt-auto">
                                <Button id="preview-button" onClick={previewProduct} value={product.productId} className="btn btn-dark non-border-button">Preview</Button>
                                <Button id="edit-button" onClick={editProduct} value={product.productId} className="btn btn-dark non-border-button">Edit</Button>                           
                                <Button id={`delete-button-${product.productId}`} onClick={deleteProduct} value={product.productId} className="btn btn-dark non-border-button">Delete</Button>
                            </div>
                        )
                    : 
                        (
                            <>
                                <Card.Text name="seller" className="limited-height-text d-flex align-items-center">
                                    <i className="bi bi-patch-check-fill text-primary me-1"></i>
                                    <span>Sell by <em>{product.seller.userName}</em></span>                                   
                                </Card.Text>
                                <Button onClick={open} value={product.productId} className="mt-auto btn btn-dark non-border-button">Buy Now!</Button>
                            </>
                        )                  
                }
                
            </Card.Body>
        </Card>
    )
}
