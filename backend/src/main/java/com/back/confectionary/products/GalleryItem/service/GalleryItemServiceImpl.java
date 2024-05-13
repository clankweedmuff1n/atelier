package com.back.confectionary.products.GalleryItem.service;

import com.back.confectionary.products.GalleryItem.GalleryItem;
import com.back.confectionary.products.GalleryItem.GalleryItemRepository;
import com.back.confectionary.products.GalleryItem.GalleryItemRequest;
import com.back.confectionary.products.GalleryItem.mapper.GalleryItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryItemServiceImpl implements GalleryItemService {
    private final GalleryItemRepository galleryItemRepository;
    private final GalleryItemMapper mapper;

    public GalleryItem createGalleryItem(GalleryItemRequest galleryItemRequest) {
        return galleryItemRepository.save(mapper.toGalleryItem(galleryItemRequest));
    }

    public List<GalleryItem> createGalleryItemAll(List<GalleryItemRequest> galleryItemRequests) {
        return galleryItemRepository.saveAll(galleryItemRequests.stream().map(mapper::toGalleryItem).toList());
    }
}
