package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.model.Room;
import com.example.repo.RoomRepository;

import java.util.List;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("/get")
    public Iterable<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/getByHotel/{hotelId}")
    public List<Room> getRoomsByHotel(@PathVariable Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }
    
    @GetMapping("/sortByPrice/{hotelId}")
    public List<Room> sortByPrice(@PathVariable Long hotelId) {
        return roomRepository.sortByPrice(hotelId);
    }
    
 
	@PutMapping("/update/{roomId}")
    public Room updateRoom(@PathVariable Long roomId, @RequestBody Room room) {
        Room roomToUpdate = roomRepository.findById(roomId).get();
        roomToUpdate.setAvailable(room.isAvailable());
        return roomRepository.save(roomToUpdate);
	}
}
