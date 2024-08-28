package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Hotel;
import com.example.repo.HotelRepository;

@RestController
@RequestMapping("/hotel")
@CrossOrigin(origins = "*")
public class HoteController {
	@Autowired
	HotelRepository hotelRepository;
	
	@GetMapping("/get")
	public Iterable<Hotel> getAllHotels() {
		return hotelRepository.findAll();
	}
	@GetMapping("/get/{id}")
	public Hotel getHotelById(Long id) {
		return hotelRepository.findById(id).get();
	}
	
	@GetMapping("/search")
	public List<Hotel> getHotelByCity(@RequestParam String city) {
		return hotelRepository.findByCity(city);
	}
		
}
