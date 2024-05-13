package com.back.confectionary.products.GalleryItem.controller;

import com.back.confectionary.products.GalleryItem.GalleryItem;
import com.back.confectionary.products.GalleryItem.GalleryItemRequest;
import com.back.confectionary.products.GalleryItem.service.GalleryItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gallery")
@RequiredArgsConstructor
public class GalleryItemController {
    private final GalleryItemService galleryItemService;

    @PostMapping("/create")
    private GalleryItem createGalleryItem(@RequestBody GalleryItemRequest galleryItemRequest) {
        return galleryItemService.createGalleryItem(galleryItemRequest);
    }

    @PostMapping("/create/all")
    private List<GalleryItem> createGalleryItemAll(@RequestBody List<GalleryItemRequest> galleryItemRequest) {
        return galleryItemService.createGalleryItemAll(galleryItemRequest);
    }
}
