package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.model.UserModel;


public interface UserRepository extends JpaRepository<UserModel, Long> {
    @Query(value = "SELECT * FROM user_model WHERE email = ?1",nativeQuery = true)
    UserModel findByEmail(String email);

    


}
