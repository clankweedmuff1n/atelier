package com.back.confectionary.products.Product.service;

import com.back.confectionary.products.Product.Product;
import com.back.confectionary.products.Product.ProductRequest;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductRequest productRequest);
    List<Product> createProductAll(List<ProductRequest> productRequests);
    List<Product> getAllProducts();
    Product getById(Long id);
    void deleteProduct(String id);
}
