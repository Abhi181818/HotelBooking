package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.model.Payment;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
	@Query(value = "SELECT p FROM Payment p WHERE p.bookingId = ?1", nativeQuery = true)
	List<Payment> findByBookingId(Long bookingId);
}
