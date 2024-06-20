import { useNavigate } from "react-router-dom";
import "./index.css";
import { Nav } from "react-bootstrap";

export const CustomFooter = () => {
    const navigate = useNavigate();

    return (
        <footer className="custom-footer text-center text-lg-start bg-light text-muted">
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>TINA Plant Marketplace
                            </h6>
                            <p>
                            Welcome to TINA, the ultimate online marketplace where plant enthusiasts can connect, buy, and sell a diverse array of plants. Whether you're a seller looking to showcase your greenery or a buyer in search of unique flora, TINA is your go-to destination for all things plants.
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Quick link
                            </h6>
                            <p>
                                <Nav.Link onClick={() => navigate("/about")} className="text-reset">About</Nav.Link>
                            </p>
                            <p>
                                <Nav.Link onClick={() => navigate("/")} className="text-reset">Shop</Nav.Link>
                            </p>
                            <p>
                                <Nav.Link onClick={() => navigate("/")} className="text-reset">Policites</Nav.Link>
                            </p>
                            <p>
                                <Nav.Link onClick={() => navigate("/")} className="text-reset">Advertise</Nav.Link>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3"></i>Mrs. Thi Tien Nguyen (Tina Nguyen) </p>
                            <p><i className="fas fa-home me-3"></i>Address: 2000 N Court, Fairfield, IA</p>
                            <p><i className="fas fa-home me-3"></i>Email: thitien.nguyen@miu.edu</p>
                            <p><i className="fas fa-phone me-3"></i>Student ID: 617 290</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright:
                <a className="text-reset fw-bold" href="/">This website is made with &lt;3 by Tina Nguyen</a>
            </div>
        </footer>
    );
};
