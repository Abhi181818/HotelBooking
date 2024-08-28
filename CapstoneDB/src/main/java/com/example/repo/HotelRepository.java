package com.example.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.Hotel;
import com.example.model.UserModel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
	    @Query(value = "SELECT * FROM hotel WHERE city = ?1",nativeQuery = true)
	    List<Hotel> findByCity( String city);
	    
	    
}
