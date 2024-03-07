package com.example.webSeller.repo;

import com.example.webSeller.model.ProductSize;
import com.example.webSeller.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ProductSizeRepo extends JpaRepository<ProductSize, Long> {

    List<ProductSize> findAllByProductId(Long productId);

    @Query(value = "select ps.id as id " +
            ", ps.productSizeName as productSizeName" +
            ", p.productName as productName" +
            ", ps.productId as productId" +
            " from ProductSize ps" +
            " left join Product p on p.id = ps.productId"
    )
    List<Map<String, Object>> getAllProductSize();

}
