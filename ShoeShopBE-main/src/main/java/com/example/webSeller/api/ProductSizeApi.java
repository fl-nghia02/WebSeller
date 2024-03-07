package com.example.webSeller.api;

import com.example.webSeller.model.ProductSize;
import com.example.webSeller.service.ProductSizeService;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("product-size")
@CrossOrigin
public class ProductSizeApi {
    private final ProductSizeService service;

    public ProductSizeApi(ProductSizeService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public String add(@RequestBody ProductSize productSize){
        service.saveProductSize(productSize);
        return "success";
    }

    @PostMapping("/get-by-product")
    public List<ProductSize> getByProductId(@RequestParam(value = "productId", defaultValue = "") Long productId){
        return service.getByProductId(productId);
    }

    @PostMapping("/delete")
    public String delete(@RequestParam(value = "id", defaultValue = "") Long id){
        service.delete(id);
        return "success";
    }

    @GetMapping("/get-all")
    public List<Map<String, Object>> getAll(){
        return service.getAll();
    }
}
