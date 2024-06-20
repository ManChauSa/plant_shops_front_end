import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.css";
import useAPI from "../../api";

export const AddProduct = () => {
    const params = useParams();
    const { GetClient, PutClient, PostClient } = useAPI();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [product, setProduct] = useState({
        productName: "",
        price: 0,
        description: "",
        inventoryCount: 0,
        categoryId: "",
        status: "AVAILABLE",
        productType: 2,
        discounts: []
    });

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const loadProduct = async (sku) => {
            const response = await GetClient("/product/" + sku);
            if (response.status === 200) {
                setProduct(response.data);
            }
        };

        const fetchCategories = async () => {
            const response = await GetClient("/category");
            if (response.status === 200) {
                setCategories(response.data);
            }
        };

        if (params.sku) {
            loadProduct(params.sku);
        }

        fetchCategories();
    }, [params]);

    const handleFieldChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await createProduct(product);
    };

    const createProduct = async (product) => {
        product.categoryId = selectedCategory; // Assign selected category to product object

        if (params.sku) {
            const response = await PutClient(`/product/${params.sku}`, product, user.token);
            if (response.status === 200) {
                let productId = response.data.productId;
                dispatch({ type: 'clearProduct', product });
                navigate(`/product/${productId}`);
            }
        } else {
            const response = await PostClient("/product", product, user.token);
            if (response.status === 200) {
                let productId = response.data.productId;
                dispatch({ type: 'clearProduct', product });
                navigate(`/product/${productId}`);
            }
        }
    };

    return (
        <Container className="box">
            <Row><Col className="text-center"><h2>Fill information</h2></Col></Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name="productName" value={product.productName} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBasePrice">
                            <Form.Label>Base Price</Form.Label>
                            <Form.Control type="number" placeholder="Base Price" name="price" value={product.price} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name="description" value={product.description} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicStockQuantity">
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Stock Quantity" name="inventoryCount" value={product.inventoryCount} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select name="category" value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button id="submitButton" variant="primary" type="submit">
                            {params.sku ? "Update Product" : "Add Product"}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
    );
};
