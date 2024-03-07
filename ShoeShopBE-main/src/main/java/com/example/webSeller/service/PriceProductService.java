package com.example.webSeller.service;

import com.example.webSeller.model.PriceProduct;
import com.example.webSeller.model.Product;
import com.example.webSeller.model.ProductSize;
import com.example.webSeller.repo.PriceProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PriceProductService {
    private final PriceProductRepo repo;

    public PriceProductService(PriceProductRepo repo) {
        this.repo = repo;
    }

    public PriceProduct savePrice(PriceProduct priceProduct){
        return repo.save(priceProduct);
    }

    public List<PriceProduct> getAll(){
        return repo.findAll();
    }


    public String delete(Long id){
        repo.deleteById(id);
        return "success";
    }

    public Optional<PriceProduct> getByFullInfo(Long productId , Long productColorId , Long productSizeId){
        return repo.findByProductIdAndAndProductColorIdAndAndProductSizeId(productId , productColorId , productSizeId);
    }

}
