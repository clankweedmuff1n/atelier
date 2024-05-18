package com.back.studio.products.GalleryItem.controller;

import com.back.studio.files.StorageService;
import com.back.studio.products.GalleryItem.GalleryItem;
import com.back.studio.products.GalleryItem.GalleryItemRequest;
import com.back.studio.products.GalleryItem.service.GalleryItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/gallery")
@RequiredArgsConstructor
public class GalleryItemController {
    private final GalleryItemService galleryItemService;
    private final StorageService storageService;

    @PostMapping("/create")
    private GalleryItem createGalleryItem(@RequestBody GalleryItemRequest galleryItemRequest) {
        return galleryItemService.createGalleryItem(galleryItemRequest);
    }

    @PostMapping("/create/file")
    public GalleryItem createGalleryItemFromFile(@RequestPart("file") MultipartFile file,
                                                 @RequestPart(name = "galleryItemRequest", required = false) GalleryItemRequest galleryItemRequest) {
        storageService.store(file);
        GalleryItemRequest request = galleryItemRequest == null ? new GalleryItemRequest() : galleryItemRequest;
        return galleryItemService.createGalleryItem(GalleryItemRequest.builder()
                .imageUrl(file.getOriginalFilename())
                .categoryId(request.getCategoryId())
                .productId(request.getProductId())
                .build());
    }

    @PostMapping("/create/all")
    private List<GalleryItem> createGalleryItemAll(@RequestBody List<GalleryItemRequest> galleryItemRequest) {
        return galleryItemService.createGalleryItemAll(galleryItemRequest);
    }

    @PostMapping("/create/file/all")
    public List<GalleryItem> createGalleryItemsFromFiles(@RequestPart("files") List<MultipartFile> files,
                                                         @RequestPart(name = "galleryItemRequests", required = false) List<GalleryItemRequest> galleryItemRequests) {
        List<GalleryItem> galleryItems = new ArrayList<>();
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            GalleryItemRequest galleryItemRequest = (galleryItemRequests != null && galleryItemRequests.size() > i) ? galleryItemRequests.get(i) : new GalleryItemRequest();

            storageService.store(file);
            GalleryItem galleryItem = galleryItemService.createGalleryItem(GalleryItemRequest.builder()
                    .imageUrl(file.getOriginalFilename())
                    .categoryId(galleryItemRequest.getCategoryId())
                    .productId(galleryItemRequest.getProductId())
                    .build());

            galleryItems.add(galleryItem);
        }
        return galleryItems;
    }
}
