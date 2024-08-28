import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.js";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Login/Login.js";
import Register from "./Components/Pages/Register/Register.js";
import { AuthProvider } from "./Components/Context/AuthContext.js";
import { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Home from "./Components/Pages/Home/Home.js";
import HotelInfo from "./Components/Pages/HotelInfo/HotelInfo.js";
import Search from "./Components/Pages/Search/Search.js";
import Footer from "./Components/Footer/Footer.js";
import { ScrollEffect } from 'react-easy-scroll-effect'
import 'react-easy-scroll-effect/dist/index.css'
import MyBookings from "./Components/Pages/MyBookings/MyBookings.js";
import About from "./Components/Pages/About/About.js";
import ContactUs from "./Components/Pages/ContactUs/ContactUs.js";
import AllHotels from "./Components/AllHotels/AllHotels.js";
function App() {
  return (
    <>
      <AuthProvider>
      <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotel/:id" element={<HotelInfo />} />
            <Route path="/search/:city" element={<Search />} />
            <Route path="/mybookings" element={<MyBookings />} />
            <Route path="/hotels" element={<AllHotels/>} />
          </Routes>
          <Footer />
          </motion.div>
      </AuthProvider>
    </>
  );
}

export default App;
