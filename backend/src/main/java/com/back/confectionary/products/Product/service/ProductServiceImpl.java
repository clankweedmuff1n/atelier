package com.back.confectionary.products.Product.service;

import com.back.confectionary.products.Product.Product;
import com.back.confectionary.products.Product.ProductRepository;
import com.back.confectionary.products.Product.ProductRequest;
import com.back.confectionary.products.Product.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    public Product createProduct(ProductRequest productRequest) {
        return productRepository.save(mapper.toProduct(productRequest));
    }

    public List<Product> createProductAll(List<ProductRequest> productRequests) {
        return productRepository.saveAll(productRequests.stream().map(mapper::toProduct).toList());
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElse(null);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(Long.valueOf(id));
    }
}
