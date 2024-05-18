package com.back.studio.products.GalleryItem;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryItemRequest {
    @JsonProperty("image")
    private String imageUrl;
    @JsonProperty("category_id")
    private Long categoryId;
    @JsonProperty("product_id")
    private Long productId;
}
