import { Form, Button, Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./index.css";

export function CustomNavBar() {
  const user = useSelector(state => state.user);
  const carts = useSelector(state => state.carts);
  const navigate = useNavigate();
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  }

  const openPage = (path) => {
    navigate(path);
  }

  const handleFieldChange = (e) => {
    dispatch({ type: "search", search: e.target.value });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/product-list?search=${search}`);
  }

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand className="fw-bold">
            <Nav.Link onClick={() => { openPage("/") }}>
              <span className="white-text">TI</span><span className="green-text">NA</span>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >     
              <Nav.Link onClick={() => { openPage("/product-list") }} className="fw-bold">
                    SHOP
                </Nav.Link>        
              {!user && <NavDropdown title="LOGIN" id="basic-nav-dropdown" className="fw-bold">
                <NavDropdown.Item onClick={() => { openPage("/login") }}>Log In</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { openPage("/signup") }}>Sign Up</NavDropdown.Item>
              </NavDropdown>}
              {user?.role === "ROLE_BUYER" &&
              <>                 
                  <Nav.Link onClick={() => { openPage("/cart") }} className="fw-bold">
                    CART <Badge className="cart-badge" pill bg="danger">{carts.length}</Badge>
                  </Nav.Link>
              </>             
              }
              {user?.role === "ROLE_SELLER" &&
                <Nav.Link onClick={() => { openPage("/manage-product/product") }} className="fw-bold">
                  ADD PRODUCT
                </Nav.Link>
              }
              {user?.role === "ROLE_SELLER" &&
                <Nav.Link onClick={() => { openPage("/manage-product") }} className="fw-bold">
                  MANAGE PRODUCT
                </Nav.Link>
              }
              {(user?.role === "ROLE_SELLER") &&
                <Nav.Link onClick={() => { openPage("/manage-order") }} className="fw-bold">
                  MANAGE ORDER
                </Nav.Link>
              }
              {(user?.role === "ROLE_ADMIN") &&
                <Nav.Link onClick={() => { openPage("/approve-seller") }} className="fw-bold">
                  APPROVE SELLER
                </Nav.Link>
              }
              {user?.role === "ROLE_BUYER" &&
                <Nav.Link onClick={() => { openPage("/your-order") }} className="fw-bold">
                  YOUR ORDER
                </Nav.Link>
              }
              {user &&
                <NavDropdown className="fw-bold" title={'Hello ' +user.name.toUpperCase()} id="name-dropdown">
                  {user?.role === "ROLE_BUYER" &&(
                    <>
                      <NavDropdown.Item onClick={() => openPage("/orders")}>Orders</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </>
                  )}                                   
                  <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                name="search"
                value={search}
                onChange={handleFieldChange}
                aria-label="Search"
              />
              <Button variant="outline-danger" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="background-image">
        {/* The image is now below the navbar */}
      </div>
    </>
  );
}
