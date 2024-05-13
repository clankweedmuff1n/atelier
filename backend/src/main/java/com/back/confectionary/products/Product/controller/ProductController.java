package com.back.confectionary.products.Product.controller;

import com.back.confectionary.products.Product.Product;
import com.back.confectionary.products.Product.ProductRequest;
import com.back.confectionary.products.Product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    private List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/create")
    private Product createProduct(@RequestBody ProductRequest productRequest) {
        return productService.createProduct(productRequest);
    }

    @PostMapping("/create/all")
    private List<Product> createProduct(@RequestBody List<ProductRequest> productRequests) {
        return productService.createProductAll(productRequests);
    }

    @DeleteMapping("/delete/{id}")
    private void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }
}
