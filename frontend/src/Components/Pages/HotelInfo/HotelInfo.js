import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./HotelInfo.css";
import Loading from "../../Loading/Loading";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ScrollEffect } from "react-easy-scroll-effect";

const HotelInfo = () => {
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [hotelImages, setHotelImages] = useState([]);
  const [bookModal, setBookModal] = useState(false);
  const [sortOption, setSortOption] = useState("price");
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showUPIDetails, setShowUPIDetails] = useState(false);
  const [bookingId, setBookingId] = useState(0);

  const handleBookSubmit = (e) => {
    e.preventDefault();

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
  
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfNights = timeDifference / (1000 * 3600 * 24);
    const totalAmount = selectedRoom.price * numberOfNights * guests;

    setPaymentModal(true);
    setAmount(totalAmount);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // if (selectedRoom.available) {
    const date = new Date();
    axios
      .post("http://localhost:8080/booking/create", {
        user: {
          userId: userDetails.userId,
        },
        hotel: {
          id: id,
        },
        room: {
          id: selectedRoom.id,
        },
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests: guests,
      })
      .then((res) => {
        console.log(res);
        if (res) {
          setBookModal(false);
          setPaymentModal(false);
          setBookingId(res.data.id);
          toast.success("Room Booked Successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      });
    axios.put(`http://localhost:8080/room/update/${selectedRoom.id}`, {
      available: false,
    });
    axios.post("http://localhost:8080/payment/create", {
      booking: {
        id: bookingId,
      },
      amount: selectedRoom.price,
      paymentDate: checkIn,
      paymentMethod: paymentMethod,
    });
  };

  const getUserDetails = () => {
    if (user) {
      axios
        .get(`http://localhost:8080/user/getByEmail/${user}`)
        .then((res) => res.data)
        .then((data) => {
          setUserDetails(data);
        });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserDetails();
    setTimeout(() => {
      axios
        .get(`http://localhost:8080/room/getByHotel/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setRooms(data);
          if (data.length > 0) {
            const images = data[0].hotel.image.split(",");
            setHotelImages(images);
          }
        });
    }, 1000);
  }, [id]);

  const handleShowModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterAvailable(e.target.checked);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === "credit" || method === "debit") {
      setShowCardDetails(true);
      setShowUPIDetails(false);
    } else if (method === "upi") {
      setShowUPIDetails(true);
      setShowCardDetails(false);
    }
  };

  const sortedAndFilteredRooms = rooms
    .filter((room) => !filterAvailable || room.available)
    .sort((a, b) => {
      if (sortOption === "price") {
        return a.price - b.price;
      } else if (sortOption === "capacity") {
        return a.capacity - b.capacity;
      }
      return 0;
    });

  if (rooms.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-md-8">
          <div>
            <h3 className="text-warning fw-bold hover-text-email">
              {rooms[0].hotel.name}
            </h3>
            <p className="text-white">
              <strong>Address:</strong> {rooms[0].hotel.address},{" "}
              {rooms[0].hotel.city}, {rooms[0].hotel.state}
            </p>
            <p className="text-white">
              <strong>Contact:</strong>{" "}
              <span className="hover-text-phone">{rooms[0].hotel.phone}</span> |{" "}
              <span className="hover-text-email">{rooms[0].hotel.email}</span>
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="sort" className="form-label text-white">
              Sort By
            </label>
            <select
              id="sort"
              className="form-select"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="price">Price</option>
              <option value="capacity">Capacity</option>
            </select>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="filterAvailable"
              checked={filterAvailable}
              onChange={handleFilterChange}
            />
            <label
              htmlFor="filterAvailable"
              className="form-check-label text-white"
            >
              Show Available Only
            </label>
          </div>

          <div className="row border rounded m-1 p-2">
            {sortedAndFilteredRooms.map((room) => (
              <div className="col-md-6 mb-4" key={room.id}>
                <div className="card room-info-card h-100 p-2 card1">
                  <div className="position-relative">
                    <img
                      src={room.hotel.image.split(",")[0]}
                      className="card-img-top"
                      alt={room.type}
                    />
                    <div className="room-info-overlay">
                      <h5 className="card-title text-primary">
                        {room.type} Room
                      </h5>
                      <p className="card-subtitle mb-2 text-muted fw-bold">
                        ₹{room.price} {}
                        <span className="text-primary">per night</span>
                      </p>
                      <p
                        className={`card-text fw-bold ${
                          room.available ? "text-success" : "text-danger"
                        }`}
                      >
                        {room.available ? "Available" : "Not Available"}
                      </p>
                      <p className="card-text text-white ">
                        <strong>Capacity:</strong> {room.capacity} guests
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn button-29 mt-2"
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error("Please Login to Book Room", {
                          position: "top-center",
                          autoClose: 2000,
                        });

                        return;
                      }
                      setBookModal(true);
                      setSelectedRoom(room);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="col-md-4 border rounded p-3"
          style={{ marginTop: "120px" }}
        >
          <h4 className="text-white fw-bold hover-text mb-2">
            Image Gallery & Amenities
          </h4>
          <div
            id="roomCarousel"
            className="carousel slide sticky-top"
            style={{ zIndex: "1" }}
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {hotelImages.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    className="d-block w-100"
                    alt="Hotel"
                    onClick={() => handleShowModal(image)}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#roomCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#roomCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="row mt-3">
            {hotelImages.map((image, index) => (
              <div className="col-4" key={index}>
                <motion.img
                  src={image}
                  className="img-thumbnail"
                  alt="Hotel Thumbnail"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleShowModal(image)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="p-0">
          <img src={selectedImage} alt="Selected" className="img-fluid w-100" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={bookModal}
        onHide={() => setBookModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold hover-text">
            Booking Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2 m-2">
          <Form onSubmit={handleBookSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white fw-bold">
                Check-In Date
              </Form.Label>
              <Form.Control
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white fw-bold">
                Check-Out Date
              </Form.Label>
              <Form.Control
                type="date"
                value={checkOut}
                className=""
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white fw-bold">
                Number of Guests
              </Form.Label>
              <Form.Control
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
                min="1"
                max={selectedRoom.capacity}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Proceed to Payment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={paymentModal}
        onHide={() => setPaymentModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="hover-text fw-bold text-white">
            Payment Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-2 p-2 text-white">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" value={`₹${amount}`} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={paymentMethod}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="upi">UPI</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
              </Form.Select>
            </Form.Group>

            {showCardDetails && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Card Expiry</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </>
            )}

            {showUPIDetails && (
              <Form.Group className="mb-3">
                <Form.Label>UPI ID</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            )}

            <Button
              variant="primary"
              type="submit"
              onClick={handlePaymentSubmit}
            >
              Complete Payment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HotelInfo;
