package com.example.webSeller.api;

import com.example.webSeller.model.PriceProduct;
import com.example.webSeller.model.Product;
import com.example.webSeller.service.PriceProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("price")
@CrossOrigin
public class PriceProductApi {
    private final PriceProductService service;

    public PriceProductApi(PriceProductService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public String add(@RequestBody PriceProduct priceProduct){
        service.savePrice(priceProduct);
        return "success";
    }

    @GetMapping("get-all")
    public List<PriceProduct> getAll(){
        return service.getAll();
    }

    @PostMapping("/delete")
    public String delete(@RequestParam(value = "id", defaultValue = "") Long id){
        service.delete(id);
        return "success";
    }

    @PostMapping("/get-info-price")
    public Optional<PriceProduct> getInfo(@RequestParam(value = "productId", defaultValue = "") Long productId , @RequestParam(value = "productColorId", defaultValue = "") Long productColorId , @RequestParam(value = "productSizeId", defaultValue = "") Long productSizeId){
        return service.getByFullInfo(productId , productColorId , productSizeId);
    }

}
