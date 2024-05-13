package com.back.confectionary.products.GalleryItem.mapper;

import com.back.confectionary.products.GalleryItem.GalleryItem;
import com.back.confectionary.products.GalleryItem.GalleryItemRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GalleryItemMapper {

    public GalleryItem toGalleryItem(GalleryItemRequest galleryItemRequest) {
        return GalleryItem.builder()
                .imageUrl(galleryItemRequest.getImageUrl())
                .build();
    }
}
