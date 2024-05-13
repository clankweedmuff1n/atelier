package com.back.confectionary.products.Category;

import com.back.confectionary.products.GalleryItem.GalleryItem;
import com.back.confectionary.products.Product.Product;
import com.back.confectionary.products.Review.Review;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="_category")
public class Category {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String link;
    @JsonProperty("button_text")
    private String buttonText;
    @OneToOne(fetch = FetchType.EAGER)
    private GalleryItem preview;
    @OneToMany(fetch = FetchType.EAGER)
    private List<GalleryItem> gallery;
    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    private List<Review> reviews;
    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    private List<Product> products;
}
