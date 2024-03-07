package com.example.webSeller.service;

import com.example.webSeller.model.Cart;
import com.example.webSeller.model.Category;
import com.example.webSeller.repo.CartRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CartService {
    private final CartRepo repo;

    public CartService(CartRepo repo) {
        this.repo = repo;
    }

    public String saveCart(Cart cart){
        repo.save(cart);
        return "success";
    }

    public String delete(Long id){
        repo.deleteById(id);
        return "success";
    }

    public List<Cart> getByUser(Long userId){
        return repo.findAllByUserId(userId);
    }

}
