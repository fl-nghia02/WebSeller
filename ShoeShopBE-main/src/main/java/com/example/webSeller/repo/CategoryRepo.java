package com.example.webSeller.repo;

import com.example.webSeller.model.Category;
import com.example.webSeller.model.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}
