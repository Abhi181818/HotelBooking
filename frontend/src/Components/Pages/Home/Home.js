import React, { useEffect } from 'react'
import Carousel from '../../Carousel/Carousel'
import HotelCard from '../../HotelCard/HotelCard'
import Card from '../../Card/Card'
import TrendingHotel from '../../TrendingHotel/TrendingHotel'
import axios from 'axios'
import FaqPage from '../../FAQ/FaqPage'

const Home = () => {

    useEffect(() => {
        const hotels = axios.get('http://localhost:8080/hotel/get')
        localStorage.setItem('hotels', hotels)
    },[]);
  return (
      <>
          <Carousel />
          <HotelCard />
          <TrendingHotel />   
          <FaqPage/>
      </>
  )
}

export default Home