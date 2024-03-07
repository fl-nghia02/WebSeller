package com.example.webSeller.repo;

import com.example.webSeller.model.PriceProduct;
import com.example.webSeller.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PriceProductRepo extends JpaRepository<PriceProduct, Long> {
    Optional<PriceProduct> findByProductIdAndAndProductColorIdAndAndProductSizeId(Long productId , Long productColorId , Long productSizeId);
}
