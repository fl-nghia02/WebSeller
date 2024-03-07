package com.example.webSeller.repo;

import com.example.webSeller.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User , Long> {
    User findByUserName(String userName);

    User findByUserNameAndPassword(String userName , String password);
}
