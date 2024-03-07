package com.example.webSeller.service;

import com.example.webSeller.model.Cart;
import com.example.webSeller.model.Category;
import com.example.webSeller.repo.CategoryRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CategoryService {
    private final CategoryRepo repo;

    public CategoryService(CategoryRepo repo) {
        this.repo = repo;
    }

    public String saveCategory(Category category){
        repo.save(category);
        return "success";
    }

    public String delete(Long id){
        repo.deleteById(id);
        return "success";
    }

    public List<Category> getAll(){
        return repo.findAll();
    }


}
