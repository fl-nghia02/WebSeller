package com.example.webSeller.api;

import com.example.webSeller.model.Product;
import com.example.webSeller.model.User;
import com.example.webSeller.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserApi {
    private final UserService service;

    public UserApi(UserService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public String add(@RequestBody User user){
        service.CreateAccout(user);
        return "success";
    }

    @PostMapping("/get-by-id")
    public Optional<User> getById(@RequestParam(value = "id", defaultValue = "") Long id){
        return service.GetById(id);
    }

    @PostMapping("/login")
    public User login(
            @RequestParam(value = "userName", defaultValue = "") String userName ,
            @RequestParam(value = "password", defaultValue = "") String password
    ){
        ;
        return service.Login(userName , password);
    }
}
