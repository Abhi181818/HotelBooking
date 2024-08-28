import {
  faFacebook,
  faGoogle,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ScrollEffect } from "react-easy-scroll-effect";

const Footer = () => {
  return (
    // <ScrollEffect>
    <div className="container-fluid border-top rounded">
      <footer className="text-white text-center text-lg-start bg-dark">
        <div className="container pt-4">
          {/* <!--Grid row--> */}
          <div className="row mt-4">
            {/* <!--Grid column--> */}
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">About Us</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              </p>

              <div className="mt-4">
                <a
                  type="button"
                  className="btn btn-primary  "
                  style={{ background: "none", border: "none" }}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  type="button"
                  className="btn btn-primary"
                  style={{ background: "none", border: "none" }}
                >
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a
                  type="button"
                  className="btn btn-primary"
                  style={{ background: "none", border: "none" }}
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  type="button"
                  className="btn btn-primary"
                  style={{ background: "none", border: "none" }}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <ul className="fa-ul" style={{ marginLeft: " 1.65em" }}>
                <li className="mb-3">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  <span className="ms-2">Bangalore, 560047 , India</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faGoogle} />
                  </span>
                  <span className="ms-2">abhishek@help.com</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <span className="ms-2">+91 8091287326</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright:
          <a className="text-white" href="http://localhost:3000/">
            HotelLight.com
          </a>
        </div>
      </footer>
      </div>
    // </ScrollEffect>
  );
};

export default Footer;
