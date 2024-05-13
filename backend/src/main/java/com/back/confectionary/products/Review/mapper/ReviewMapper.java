package com.back.confectionary.products.Review.mapper;

import com.back.confectionary.products.Category.CategoryRepository;
import com.back.confectionary.products.Product.ProductRepository;
import com.back.confectionary.products.Review.Review;
import com.back.confectionary.products.Review.ReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReviewMapper {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public Review toReview(ReviewRequest reviewRequest) {
        return Review.builder()
                .author(reviewRequest.getAuthor())
                .rate(reviewRequest.getRate())
                .avatarUrl(reviewRequest.getAvatarUrl())
                .category(reviewRequest.getCategoryId() != null ? categoryRepository.findById(reviewRequest.getCategoryId())
                        .orElse(null) : null)
                .description(reviewRequest.getDescription())
                .product(reviewRequest.getProductId() != null ? productRepository.findById(reviewRequest.getProductId())
                        .orElse(null) : null)
                .build();
    }
}
