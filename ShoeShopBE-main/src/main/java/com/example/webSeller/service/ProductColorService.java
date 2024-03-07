package com.example.webSeller.service;

import com.example.webSeller.model.ProductColor;
import com.example.webSeller.model.ProductSize;
import com.example.webSeller.repo.ProductColorRepo;
import com.example.webSeller.repo.ProductSizeRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProductColorService {

    private final ProductColorRepo repo;


    public ProductColorService(ProductColorRepo repo) {
        this.repo = repo;
    }

    public ProductColor saveProductSize(ProductColor productColor){
        return repo.save(productColor);
    }

    public List<ProductColor> getByProductId(Long productId){
        return repo.findAllByProductId(productId);
    }

    public String delete(Long id){
        repo.deleteById(id);
        return "success";
    }

    public List<Map<String, Object>> getAll(){
        return repo.getAllProductColor();
    }
}
