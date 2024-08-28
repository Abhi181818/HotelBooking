package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.UserModel;
import com.example.repo.UserRepository;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/add")
    public String addUser(@RequestBody UserModel user) {
    	userRepository.save(user);
        return "User added successfully";
    }
    
    @GetMapping("/get")
	public Iterable<UserModel> getAllUsers() {
		return userRepository.findAll();
	}
    
    @GetMapping("/get/{id}")
	public UserModel getUserById(@PathVariable Long id) {
		return userRepository.findById(id).get();
	}
    
    @GetMapping("/getByEmail/{email}")
        public UserModel getUserByEmail(@PathVariable String email) {
    	            return userRepository.findByEmail(email);
    	            	
    }
    
    @PostMapping("/authenticate")
    public String authenticateUser(@RequestBody UserModel user) {
        UserModel u = userRepository.findByEmail(user.getEmail());
        if (u != null) {
            if (u.getPassword().equals(user.getPassword())) {
                return "User authenticated successfully";
            } else {
                return "Invalid password";
            }
        } else {
            return "User not found";
        }
    }
}
