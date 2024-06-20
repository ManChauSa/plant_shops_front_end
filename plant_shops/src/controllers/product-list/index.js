import React, { useEffect, useState } from "react";
import "./index.css";
import { ProductCell } from "../../components";
import useAPI from "../../api";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);

    const { GetClient } = useAPI();

    useEffect(() => {
        async function fetchCategories() {
            const response = await GetClient("/category");
            if (response.status === 200) {
                setCategories(response.data);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const searchKey = searchParams.get("search") || "";
            const categoryParams = selectedCategories.length ? `&listCategories=${selectedCategories.join(",")}` : "";
            const priceParams = `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
            const sortType = `&listSortTypes=1`;
            const path = `/product?search=${searchKey}${categoryParams}${sortType}${priceParams}`;
            const response = await GetClient(path);
            if (response.status === 200) {
                setProducts(response.data);
            }
        }
        fetchData();
    }, [searchParams, selectedCategories, minPrice, maxPrice]);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(Number(e.target.value));
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(Number(e.target.value));
    };

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h3>Filters</h3>
                    <Form>
                    <Form.Group>
                            <Form.Label>Price Range</Form.Label>
                            <div className="d-flex justify-content-between">
                                <Form.Control
                                    type="number"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    placeholder="Min Price"
                                    style={{ width: "45%" }}
                                />
                                <Form.Control
                                    type="number"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    placeholder="Max Price"
                                    style={{ width: "45%" }}
                                />
                            </div>
                            <Form.Range
                                value={minPrice}
                                min={0}
                                max={100000}
                                step={1000}
                                onChange={handleMinPriceChange}
                            />
                            <Form.Range
                                value={maxPrice}
                                min={0}
                                max={100000}
                                step={1000}
                                onChange={handleMaxPriceChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Categories</Form.Label>
                            {categories.map((category) => (
                                <Form.Check
                                    key={category.categoryId}
                                    type="checkbox"
                                    label={category.categoryName}
                                    checked={selectedCategories.includes(category.categoryId)}
                                    onChange={() => handleCategoryChange(category.categoryId)}
                                />
                            ))}
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9}>
                    <Row><Col className="text-center"><h2>All Plants</h2></Col></Row>
                    <Row>
                        {products.map((product) => (
                            <Col key={product.productId} sm={3}>
                                <div className="productItem">
                                    <ProductCell product={product} isManage={false} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
