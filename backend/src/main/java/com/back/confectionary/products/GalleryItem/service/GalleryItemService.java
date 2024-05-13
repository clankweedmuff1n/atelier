package com.back.confectionary.products.GalleryItem.service;

import com.back.confectionary.products.GalleryItem.GalleryItem;
import com.back.confectionary.products.GalleryItem.GalleryItemRequest;

import java.util.List;

public interface GalleryItemService {
    GalleryItem createGalleryItem(GalleryItemRequest galleryItemRequest);

    List<GalleryItem> createGalleryItemAll(List<GalleryItemRequest> galleryItemRequests);
}
