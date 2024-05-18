package com.back.studio.products.GalleryItem.service;

import com.back.studio.products.GalleryItem.GalleryItem;
import com.back.studio.products.GalleryItem.GalleryItemRequest;

import java.util.List;

public interface GalleryItemService {
    GalleryItem createGalleryItem(GalleryItemRequest galleryItemRequest);

    List<GalleryItem> createGalleryItemAll(List<GalleryItemRequest> galleryItemRequests);
}
