import React from "react";

const ContactUs = () => {
  return (
    <div className="container fw-bold">
      <h1 className="text-white ">Contact Us</h1>
      <p className="text-white ">
        For any queries, feel free to contact us at:
      </p>
      <p className="text-white ">
        Email:
        <a href="mailto:abhishek513@duck.com">abhishek513@duck.com</a>
      </p>
      <p className="text-white ">
        Phone:
        <a href="tel:+919876543210">+91 9876543210</a>
      </p>
    </div>
  );
};

export default ContactUs;
