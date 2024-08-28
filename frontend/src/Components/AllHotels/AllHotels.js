import axios from "axios";
import React, { useEffect, useState } from "react";

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/hotel/get")
      .then((res) => res.data)
      .then((data) => {
        setHotels(data);
      });
  }, []);
  return (
    <div className="container">
          <h1 className="text-white fw-bold text-center border-bottom">All Hotels</h1>
          <div className="row">
            {hotels.map((hotel) => (
              <div className="col-md-4 mb-4" key={hotel.id}>
                <div className="card hotel-card h-100" style={{ width: "18rem" }}>
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
                    <h5 className="card-title text-warning fw-bold">{hotel.name}</h5>
                    <span className="text-white">Address:</span>
                    <p className="card-text fw-bold text-secondary">
                      {hotel.address}, {hotel.city} , {hotel.state}
                    </p>
                    <a href={`/hotel/${hotel.id}`} className="btn button-29">
                      Check Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
            </div>
    </div>
  );
};

export default AllHotels;
