package com.example.webSeller.service;

import com.example.webSeller.model.ProductSize;
import com.example.webSeller.repo.ProductSizeRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProductSizeService {
    private final ProductSizeRepo repo;

    public ProductSizeService(ProductSizeRepo repo) {
        this.repo = repo;
    }

    public ProductSize saveProductSize(ProductSize productSize){
        return repo.save(productSize);
    }

    public List<ProductSize> getByProductId(Long productId){
        return repo.findAllByProductId(productId);
    }

    public String delete(Long id){
        repo.deleteById(id);
        return "success";
    }

    public List<Map<String, Object>> getAll(){
        return repo.getAllProductSize();
    }
}
