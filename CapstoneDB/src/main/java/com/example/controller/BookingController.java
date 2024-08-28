package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.model.Booking;
import com.example.repo.BookingRepository;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/get")
    public Iterable<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/getByUser/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }
    
    @DeleteMapping("/delete/{bookingId}")
	public void deleteBooking(@PathVariable Long bookingId) {
		bookingRepository.deleteById(bookingId);
	}
    @PutMapping("/update/{bookingId}")
    public Booking updateBooking(@PathVariable Long bookingId, @RequestBody Booking booking) {
        Booking updatedBooking = bookingRepository.findById(bookingId). get();
        updatedBooking.setCheckInDate(booking.getCheckInDate());
        updatedBooking.setCheckOutDate(booking.getCheckOutDate());
        updatedBooking.setNumberOfGuests(booking.getNumberOfGuests());
        return bookingRepository.save(updatedBooking);
    }
}
