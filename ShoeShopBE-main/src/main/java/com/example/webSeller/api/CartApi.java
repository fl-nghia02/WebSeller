package com.example.webSeller.api;

import com.example.webSeller.model.Cart;
import com.example.webSeller.model.PriceProduct;
import com.example.webSeller.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cart")
@CrossOrigin
public class CartApi {
    private final CartService service;

    public CartApi(CartService service) {
        this.service = service;
    }


    @PostMapping("/add")
    public String add(@RequestBody Cart cart){
        service.saveCart(cart);
        return "success";
    }

    @PostMapping("/get-by-user")
    public List<Cart> getByUser(@RequestParam(value = "userId", defaultValue = "") Long userId){
        return service.getByUser(userId);
    }

    @PostMapping("/delete")
    public String delete(@RequestParam(value = "id", defaultValue = "") Long id){
        service.delete(id);
        return "success";
    }
}
