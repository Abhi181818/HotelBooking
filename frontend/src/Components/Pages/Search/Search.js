import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { motion } from "framer-motion";
const Search = () => {
  const { city } = useParams();
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      axios
      .get(`http://localhost:8080/hotel/search?city=${city}`)
      .then((res) => res.data)
      .then((data) => {
        setHotels(data);
      });
    }, 2000);

  }, [city]);

  if (hotels.length === 0) {
    return <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Loading />
        </motion.div>
    </div>;
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-warning fw-bold hover-text-email">
            Showing Result for : Hotels in {city}
          </h3>
          <div className="row">
            {hotels.map((hotel) => (
              <div className="col-md-6 mb-4" key={hotel.id}>
                <div className="card room-info-card h-100 p-2 card1 mt-2">
                  <div className="image-wrapper position-relative">
                    <img
                      src={hotel.image.split(",")[0]}
                      className="card-img-top"
                      alt={hotel.name}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-warning fw-bold">
                      {hotel.name}
                    </h5>
                    <span className="text-white">Address:</span>
                    <p className="card-text fw-bold text-secondary">
                      {hotel.address}, {hotel.city} , {hotel.state}
                    </p>
                    <button onClick={(e) => {
                      e.preventDefault();
                      navigate(`/hotel/${hotel.id}`);
                    }} className="btn btn-warning">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
