package com.back.confectionary.products.Product.mapper;

import com.back.confectionary.products.Category.CategoryRepository;
import com.back.confectionary.products.GalleryItem.GalleryItemRepository;
import com.back.confectionary.products.Product.Product;
import com.back.confectionary.products.Product.ProductRequest;
import com.back.confectionary.products.Review.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMapper {
    private final CategoryRepository categoryRepository;

    private final GalleryItemRepository galleryItemRepository;
    private final ReviewRepository reviewRepository;

    public Product toProduct(ProductRequest productRequest) {
        return Product.builder()
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .productType(productRequest.getProductType())
                .gallery(productRequest.getGallery() != null ? galleryItemRepository.findAllById(productRequest.getGallery()) : null)
                .price(productRequest.getPrice())
                .link(productRequest.getLink())
                .details(productRequest.getDetails())
                .composition(productRequest.getComposition())
                .preview(productRequest.getPreview() != null ? galleryItemRepository.findById(productRequest.getPreview())
                        .orElse(null) : null)
                .reviews(productRequest.getReviews() != null ? reviewRepository.findAllById(productRequest.getReviews())
                        : null)

                .category(productRequest.getCategoryId() != null ? categoryRepository.findById(productRequest.getCategoryId())
                        .orElse(null) : null)
                .build();
    }
}
