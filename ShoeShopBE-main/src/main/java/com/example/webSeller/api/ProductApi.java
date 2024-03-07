package com.example.webSeller.api;

import com.example.webSeller.model.Product;
import com.example.webSeller.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("product")
@CrossOrigin
public class ProductApi {
    private final ProductService productService;


    public ProductApi(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public String add(@RequestBody Product product){
        productService.saveProduct(product);
        return "success";
    }

    @GetMapping("get-all")
    public List<Product> getAll(){
        return productService.getAll();
    }

    @PostMapping("/get-by-id")
    public Optional<Product> delete(@RequestParam(value = "id", defaultValue = "") Long id){
        return productService.getById(id);

    }

    @PostMapping("/search")
    public List<Product> search(@RequestParam(value = "search", defaultValue = "#") String search , @RequestParam(value = "categoryId", defaultValue = "0") Long categoryId){
        return productService.search(search , categoryId);

    }

    @PostMapping("/edit")
    public String edit(@RequestBody Product product){
        productService.editProduct(product);
        return "success";
    }

}
