package com.example.webSeller.repo;

import com.example.webSeller.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product , Long> {

    Optional<Product> findById(Long id);

    @Query(value = "select p" +
            " from Product p" +
            " where (p.categoryId in (:categoryId) or 0 in (:categoryId))" +
            " and (lower(coalesce(p.productName,''))" +
            "like lower(concat('%',:search,'%')) or coalesce(:search, '#') = '#') "


    )
    List<Product> listSearch(@Param("search") String search , @Param("categoryId") Long categoryId);

}
