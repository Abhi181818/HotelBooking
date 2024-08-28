import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-us-container  m-2">
      <div className="text-section ">
        <h1 className='text-center text-white hover-text'>About Us</h1>
        <p className='text-white'>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nunc ultricies elit, nec ultricies elit nunc nec ultricies. Nullam auctor, nisl nec ultricies ultricies, nunc nunc ultricies elit, nec ultricies elit nunc nec ultricies.
        </p>
        <p className='text-white'>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nunc ultricies elit, nec ultricies elit nunc nec ultricies. Nullam auctor, nisl nec ultricies ultricies, nunc nunc ultricies elit, nec ultricies elit nunc nec ultricies.
        </p>
      </div>
      <div className="photo-section">
        <img src="path_to_your_image.jpg" alt="About Us" />
      </div>
    </div>
  );
};

export default About;
