package com.example.webSeller.service;

import com.example.webSeller.model.Product;
import com.example.webSeller.repo.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepo repo;

    public ProductService(ProductRepo repo) {
        this.repo = repo;
    }

    public Product saveProduct(Product product){
        Date currentDate = new Date();
        product.setCreateDate(currentDate);
        return repo.save(product);
    }

    public Product editProduct(Product product){
        var productOld = repo.findById(product.getId());

        Date currentDate = new Date();
        product.setId(productOld.get().getId());
        product.setCreateDate(currentDate);
        return repo.save(product);
    }

    public List<Product> getAll(){
        return repo.findAll();
    }

    public Optional<Product> getById(Long id){
        return repo.findById(id);
    }
    public List<Product> search(String search , Long categoryId){
        return repo.listSearch(search , categoryId );
    }
}
