package com.example.model;

import org.antlr.v4.runtime.misc.NotNull;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @SuppressWarnings("deprecation")
    @NotNull
    private String firstName;

    @SuppressWarnings("deprecation")
    @NotNull
    private String lastName;

    @SuppressWarnings("deprecation")
    @NotNull
    private String email;

    @SuppressWarnings("deprecation")
    @NotNull
    private String password;

}
