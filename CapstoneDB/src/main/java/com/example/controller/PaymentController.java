package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.model.Payment;
import com.example.repo.PaymentRepository;

import java.util.List;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping("/get")
    public Iterable<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/getByBooking/{bookingId}")
    public List<Payment> getPaymentsByBooking(@PathVariable Long bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }

    @PostMapping("/create")
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentRepository.save(payment);
    }
}
