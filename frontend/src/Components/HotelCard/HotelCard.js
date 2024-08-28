import React, { useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import "./HotelCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ScrollEffect } from "react-easy-scroll-effect";

const HotelCard = () => {
  const [city, setCity] = useState("");
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => { 
    e.preventDefault();
    
    if (!city) {
      toast.error("City is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    
    if (!checkin || !checkout) {
      toast.error("Both check-in and check-out dates are required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (new Date(checkin) >= new Date(checkout)) {
      toast.error("Check-in date must be earlier than check-out date", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    navigate(`/search/${city}`, { state: { guests, checkin, checkout } });
  };

  return (
    <ScrollEffect>
      <div className="text-white">
        <div className="blur-background"></div>
        <div className="hotel-search-card shadow-lg p-4" style={{ marginTop: "-150px", opacity: "0.9" }}>
          <h2 className="text-center mb-4">Search Hotels</h2>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="destination">City</label>
                  <input
                    type="text"
                    id="city"
                    name="destination"
                    className="form-control"
                    placeholder="Enter destination"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group" style={{ zIndex: "1" }}>
                  <label htmlFor="checkin">Check-in</label>
                  <DatePicker
                    id="checkin"
                    name="checkin"
                    className="form-control"
                    value={checkin}
                    onChange={setCheckin}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="checkout">Check-out</label>
                  <DatePicker
                    id="checkout"
                    name="checkout"
                    className="form-control"
                    value={checkout}
                    onChange={setCheckout}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="guests">Guests</label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    className="form-control"
                    min="1"
                    max="10"
                    placeholder="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button type="submit" onClick={handleSearch} className="button-29 btn w-100">
              Search
            </button>
          </form>
        </div>
      </div>
    </ScrollEffect>
  );
};

export default HotelCard;
