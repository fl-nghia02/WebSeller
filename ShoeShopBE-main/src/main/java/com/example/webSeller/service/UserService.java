package com.example.webSeller.service;

import com.example.webSeller.model.User;
import com.example.webSeller.repo.UserRepo;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepo repo;

    public UserService(UserRepo repo) {
        this.repo = repo;
    }

    public User CreateAccout(User user){
        var account = repo.findByUserName(user.getUserName());
        if(account == null){
            user.setIsAdmin(0);
            return repo.save(user);
        } else {
            throw new RuntimeException("user đã tồn tại");
        }

    }

    public Optional<User> GetById(Long id){
        return repo.findById(id);
    }

    public User Login(String userName , String password){
        var user = repo.findByUserNameAndPassword(userName, password);
        if(user == null){
            throw new RuntimeException("Nhập sai username hoặc password");
        } else {
            return user;
        }

    }
}
