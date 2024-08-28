package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.model.Booking;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	@Query(value="SELECT * FROM booking b WHERE b.user_user_id = ?1", nativeQuery = true)
   public List<Booking> findByUserId(Long userId);
}
