import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSignIn, faSignOut, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!city) {
      return;
    }
    navigate(`/search/${city}`);
    setCity("");
  };
  const contactUs = (e) => { 
    e.preventDefault();
    navigate("/contactus");
  }

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/user/getByEmail/${user}`)
        .then((res) => res.data)
        .then((data) => {
          setUserDetails(data);
        });
    }
  }, [isAuthenticated]);
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="text-white">
            <strong>Hotel</strong>
          </span>
          <span className="text-danger">
            <strong>Light</strong>
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarScroll"
        >
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ "--bs-scroll-height": "100px" }}
          >
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <b> Home</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <b>About</b>
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={(e)=>contactUs(e)}>
                <b>Contact Us</b>
              </button>
            </li>
          </ul>

          <div className="d-flex mx-auto">
            <div className={`search-box ${isSearchOpen ? "open" : ""}`}>
              <button className="btn-search" onClick={() => handleSearch()}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                type="text"
                className="input-search"
                placeholder="Type to Search..."
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex gap-2">
            {!isAuthenticated ? (
              <>
                <Link className="login" role="button" to="/login">
                  Login { }
                  <FontAwesomeIcon icon={faSignIn} />
                </Link>

                <Link className="signup" to="/register" role="button">
                  Sign Up { } 
                  <FontAwesomeIcon icon={faUserPlus} />
                </Link>
              </>
            ) : (
              <>
                <Dropdown className="login">
                  <Dropdown.Toggle
                    style={{
                      background: "none",
                      border: "none",
                      color: "black",
                    }}
                  >
                    Welcome {userDetails.firstName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ background: "rgb(15 23 42)", color: "whitesmoke" }}
                  >
                    <Dropdown.Item
                      style={{ color: "whitesmoke" }}
                      className="options"
                      onClick={() => {
                        setShowProfile(true);
                      }}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ color: "whitesmoke" }}
                        className="options"
                        onClick={() => navigate("/mybookings")}
                    >
                      MyBookings
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <button
                  className="btn logout"
                  onClick={() => setIsAuthenticated(false)}
                >
                    Logout { }
                    <FontAwesomeIcon  icon={faSignOut} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showProfile}
        onHide={() => setShowProfile(false)}
        className="mt-3"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-center text-white">
            Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-center fw-bold container text-warning m-2 p-2" style={{textAlign:"left"}}>
          <p>UserId: {userDetails.userId}</p>
          <p>Name: {userDetails.firstName} { userDetails.lastName}</p>
          <p>Email: {userDetails.email}</p>
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default Navbar;
