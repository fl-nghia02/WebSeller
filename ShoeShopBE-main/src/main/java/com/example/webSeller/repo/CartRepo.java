package com.example.webSeller.repo;

import com.example.webSeller.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepo extends JpaRepository<Cart, Long> {
    List<Cart> findAllByUserId(Long userId);
}
