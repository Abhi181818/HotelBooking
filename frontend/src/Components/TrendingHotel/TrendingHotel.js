import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { ScrollEffect } from "react-easy-scroll-effect";

const TrendingHotel = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/hotel/get")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
      });
    // console.log(hotels);
  }, []);
  return (
    <div className="container-fluid  rounded p-2 mt-2">
        <Card />
      </div>
  );
};

export default TrendingHotel;
