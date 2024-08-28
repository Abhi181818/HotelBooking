import React from "react";
import "./Carousel.css";
const Carousel = () => {
  return (
    <div id="carouselExample" className="carousel slide mt-2">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D"
            className="d-block w-100 carousel-img"
            alt="Hotel"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Find Your <span className="text-primary">Perfect Escape</span></h5>
            <p className="text-white">Explore stunning destinations and book the perfect stay for your next getaway.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
            className="d-block w-100 carousel-img"
            alt="Hotel"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Relax in <span className="text-primary">Luxury</span></h5>
            <p className="text-white">Indulge in comfort and style with our handpicked luxury hotels.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?cs=srgb&dl=pexels-pixabay-261169.jpg&fm=jpg"
            className="d-block w-100 carousel-img"
            alt="Hotel"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Adventure Awaits</h5>
            <p className="text-white">Whether it's a beachside retreat or a mountain adventure, we have accommodations for every travel style.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
