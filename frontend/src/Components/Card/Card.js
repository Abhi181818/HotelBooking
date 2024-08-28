import React, { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = () => {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/hotel/get")
      .then((res) => res.data)
      .then((data) => {
        setHotel(data.slice(0, 5));
      });
  }, []);

  return (
    <div className="container-fluid border rounded p-2 mt-3">
      <h3>
        <strong className="text-white">Trending</strong>{" "}
        <strong>
          <span className="text-primary">Hotels</span>
        </strong>
      </h3>
      <div className="row">
        {hotel.map((hotel) => (
          <div className="col-md-4 mb-4" key={hotel.id}>
            <div className="card hotel-card h-100" style={{ width: "20rem" }}>
              <div className="image-wrapper position-relative">
                <img
                  src={hotel.image.split(",")[0]}
                  className="card-img-top hotel-card-img"
                  alt={hotel.name}
                />
                <div className="rating-overlay">
                  <span className="badge bg-warning text-dark">
                    {hotel.rating} ⭐
                  </span>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title text-warning fw-bold">
                  {hotel.name}
                </h5>
                <span className="text-white">Address:</span>
                <p className="card-text fw-bold text-secondary">
                  {hotel.address}, {hotel.city} , {hotel.state}
                </p>
                <Link to={`/hotel/${hotel.id}`} className="btn button-29">
                  Check Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="btn">
          <Link to="/hotels" className="btn button-29">
            View All Hotels
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
