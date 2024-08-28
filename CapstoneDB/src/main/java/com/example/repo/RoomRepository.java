package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.model.Room;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
	@Query(value="SELECT * FROM room r WHERE r.hotel_id = ?1", nativeQuery = true)
    public List<Room> findByHotelId(Long hotelId);
	
	@Query(value="SELECT * FROM room r WHERE r.hotel_id = ?1 ORDER BY r.price", nativeQuery = true)
	    public List<Room> sortByPrice(Long hotelId);
}
