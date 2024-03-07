package com.example.webSeller.api;

import com.example.webSeller.model.Cart;
import com.example.webSeller.model.Category;
import com.example.webSeller.service.CartService;
import com.example.webSeller.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("category")
@CrossOrigin
public class CategoryApi {

    private final CategoryService service;

    public CategoryApi(CategoryService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public String add(@RequestBody Category category){
        service.saveCategory(category);
        return "success";
    }

    @PostMapping("/delete")
    public String delete(@RequestParam(value = "id", defaultValue = "") Long id){
        service.delete(id);
        return "success";
    }

    @GetMapping("/get-all")
    public List<Category> getAll(){
        return service.getAll();
    }
}
