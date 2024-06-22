import React, { useState, useEffect } from "react";
import './index.css';
import { Button, Col, Container, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAPI from "../../../../api";
import { useParams } from "react-router-dom";

export const Review = () => {
  const user = useSelector(state => state.user);
  const { PostClient, GetClient, DeleteClient } = useAPI();
  const emptyData = { reviewText: "", userName: "", productId: "" };
  const [review, setReview] = useState(emptyData);
  const [reviewList, setReviewList] = useState([]);
  const params = useParams();

  const onComment = async (e) => {
    e.preventDefault();
    const updatedReview = { userName: user.userName, productId: params.sku, reviewText: review.reviewText };
    const response = await PostClient("/review", updatedReview, user.token);
    await loadReview(params.sku, user.userName);
    await loadReviewList(params.sku);
    setReview(emptyData);
  }

  const deleteReview = async (reviewId) => {
    const response = await DeleteClient(`/review/${reviewId}`, user.token);
    await loadReviewList(params.sku);
  }

  const loadReview = async (sku, userName) => {
    const response = await GetClient(`/review/personal/${sku}`, user.token);
    if (response.status === 200) {
      setReview(response.data);
    }
  }

  const loadReviewList = async (sku) => {
    const response = await GetClient(`/review/${sku}`);
    if (response.status === 200) {
      setReviewList(response.data);
    }
  }

  useEffect(() => {
    async function fetching() {
      await loadReview(params.sku, user.userName);
      await loadReviewList(params.sku);
    }
    if (user) {
      fetching();
    }
  }, [params, user]);

  const handleOnChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Container className="text-center" style={{ marginTop: "100px" }}>
        <Row>
          <h3> Your review</h3>
        </Row>
        <Form onSubmit={onComment}>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <FloatingLabel label="Your review matters">
                  <Form.Control
                    id="product-review-comment"
                    onChange={handleOnChange}
                    disabled={review.id}
                    name="reviewText"
                    value={review.reviewText}
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col lg={3}></Col>
          </Row>
          <Button id="add-review"
            disabled={review.id}
            className="btn btn-dark"
            size="lg"
            type="submit"
            variant="dark">Write a review</Button>
        </Form>
      </Container>

      <Container className="text-center" style={{ marginTop: "20px" }}>
        <Row>
          <h3> All Reviews</h3>
        </Row>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Review</th>
                  {user?.role === "ROLE_ADMIN" && <th>Action</th>}
                </tr>
              </thead>
              <tbody id="review-table">
                {reviewList.map(o => (
                  <tr key={o.id}>
                    <td>{o.name}</td>
                    <td>{o.reviewText}</td>
                    {user?.role === "ROLE_ADMIN" && (
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteReview(o.reviewId)}
                        >
                          Delete
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </Container>
    </>
  );
}
