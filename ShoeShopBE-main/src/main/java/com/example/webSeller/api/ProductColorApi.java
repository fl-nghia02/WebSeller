package com.example.webSeller.api;

import com.example.webSeller.model.ProductColor;
import com.example.webSeller.model.ProductSize;
import com.example.webSeller.service.ProductColorService;
import com.example.webSeller.service.ProductSizeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("product-color")
@CrossOrigin
public class ProductColorApi {
    private final ProductColorService service;

    public ProductColorApi(ProductColorService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public String add(@RequestBody ProductColor productColor){
        service.saveProductSize(productColor);
        return "success";
    }

    @PostMapping("/get-by-product")
    public List<ProductColor> getByProductId(@RequestParam(value = "productId", defaultValue = "") Long productId){
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
