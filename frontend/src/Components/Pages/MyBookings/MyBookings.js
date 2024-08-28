import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const MyBookings = () => {
  const { isAuthenticated, user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancelBooking = (booking) => {
    try {
      axios
        .delete(`http://localhost:8080/booking/delete/${booking.id}`)
        .then((res) => res.data)
        .then((data) => {
          toast.success("Booking Cancelled Successfully");
          toast.info("Your Amount will be refunded within 7 working days");
          setBookings(bookings.filter((b) => b.id !== booking.room.id));
          setTimeout(() => {
            navigate("/mybookings");
          }, 1000);
        });

      axios.put(`http://localhost:8080/room/update/${booking.room.id}`, {
        available: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      axios
        .get(`http://localhost:8080/user/getByEmail/${user}`)
        .then((res) => res.data)
        .then((data) => {
          setUserDetails(data);
          axios
            .get(`http://localhost:8080/booking/getByUser/${data.userId}`)
            .then((res) => res.data)
            .then((data) => {
              setBookings(data);
            });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdateBooking = (booking) => {
    setSelectedBooking(booking);
    setShowUpdateModal(true);
  };

  const handleDownloadPdf = (booking) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Hotel Receipt", 20, 20);
    doc.text(`Receipt No: ${booking.id}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);

    doc.text("Guest Information", 20, 70);
    doc.text(`Name: ${userDetails.firstName}`, 20, 75);
    doc.text(`Email: ${userDetails.email}`, 20, 80);

    doc.setFontSize(14);
    doc.text("Booking Details", 20, 95);
    doc.text(`Hotel Name: ${booking.hotel.name}`, 20, 100);
    doc.text(`Address: ${booking.hotel.address}`, 20, 105);
    doc.text(`Room Type: ${booking.room.type}`, 20, 110);
    doc.text(`Check-In Date: ${booking.checkInDate}`, 20, 115);
    doc.text(`Check-Out Date: ${booking.checkOutDate}`, 20, 120);

    doc.text("Payment Information", 20, 130);
    doc.text(`Payment Method: Credit Card`, 20, 135);
    doc.text(`Total Amount: ₹${booking.room.price}`, 20, 140);

    doc.text("Thank you for staying with us!", 20, 150);

    doc.save(`Booking_${booking.id}.pdf`);
  };

  const handleModalClose = () => {
    setShowUpdateModal(false);
    setSelectedBooking(null);
  };

  const handleBookingUpdate = () => {
    axios.put(`http://localhost:8080/booking/update/${selectedBooking.id}`, {
      checkInDate: document.getElementById("formCheckInDate").value,
      checkOutDate: document.getElementById("formCheckOutDate").value,
    });
    toast.success("Booking Updated Successfully", {
      position: "top-center",
    });
    setShowUpdateModal(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <div className="container-fluid rounded p-2 mt-2">
            <div
              className="text-center text-white fw-bold border-bottom"
              style={{ fontSize: "50px" }}
            >
              <span className="hover-text">
                <span className="text-primary"> My</span> Bookings
              </span>
            </div>
            <div className="row mt-3">
              {bookings.map((booking) => (
                <div className="col-md-4 mb-4" key={booking.id}>
                  <div
                    className="card hotel-card h-100"
                    style={{ width: "20rem" }}
                  >
                    <div className="image-wrapper position-relative">
                      <img
                        src={booking.hotel.image.split(",")[0]}
                        className="card-img-top hotel-card-img"
                        alt={booking.hotel.name}
                      />
                      <div className="rating-overlay">
                        <span className="badge bg-warning text-dark">
                          {booking.hotel.rating} ⭐
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-warning fw-bold">
                        {booking.hotel.name}
                      </h5>
                      <span className="text-white">Address:</span>
                      <p className="card-text fw-bold text-secondary">
                        {booking.hotel.address}, {booking.hotel.city} ,{" "}
                        {booking.hotel.state}
                      </p>
                      <p className="card-text fw-bold text-secondary">
                        Check In: {booking.checkInDate}
                      </p>
                      <p className="card-text fw-bold text-secondary">
                        Check Out: {booking.checkOutDate}
                      </p>
                      <p className="card-text fw-bold text-primary">
                        Total Amount: ₹{booking.room.price}
                      </p>
                    </div>
                    <div>
                      <div className="d-flex justify-content-center">
                        <div className="text-white fw-bold">
                          <span className="text-primary">Room Type:</span>{" "}
                          {booking.room.type}
                        </div>
                      </div>
                      <button
                        className="btn button-29 p-2 m-2"
                        onClick={() => {
                          handleCancelBooking(booking);
                        }}
                      >
                        Cancel Booking
                      </button>
                      <button
                        className="btn button-29 p-2 m-2"
                        onClick={() => {
                          handleUpdateBooking(booking);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn button-29 p-2 m-2"
                        onClick={() => handleDownloadPdf(booking)}
                      >
                        Download PDF
                        <FontAwesomeIcon icon={faDownload} className="ms-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedBooking && (
            <Modal show={showUpdateModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title className="text-white fw-bold">Update Booking</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-white p-2 m-2">
                <Form>
                  <Form.Group controlId="formCheckInDate">
                    <Form.Label>Check-In Date</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={selectedBooking.checkInDate}
                    />
                  </Form.Group>
                  <Form.Group controlId="formCheckOutDate" className="mt-3">
                    <Form.Label>Check-Out Date</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={selectedBooking.checkOutDate}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleBookingUpdate}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div
            className="text-center text-white fw-bold"
            style={{ fontSize: "50px" }}
          >
            Please login to view your bookings
          </div>
        </div>
      )}
    </>
  );
};

export default MyBookings;
