package com.example.webSeller.repo;

import com.example.webSeller.model.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ProductColorRepo extends JpaRepository<ProductColor, Long> {
    List<ProductColor> findAllByProductId(Long productId);

    @Query(value = "select pc.id as id " +
            ", pc.productColorName as productColorName" +
            ", p.productName as productName" +
            ", pc.productId as productId" +
            " from ProductColor pc" +
            " left join Product p on p.id = pc.productId"
    )
    List<Map<String, Object>> getAllProductColor();

}
