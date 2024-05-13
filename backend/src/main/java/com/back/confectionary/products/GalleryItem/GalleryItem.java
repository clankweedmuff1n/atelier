package com.back.confectionary.products.GalleryItem;

import com.back.confectionary.products.Category.Category;
import com.back.confectionary.products.Product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_gallery")
public class GalleryItem {
    @Id
    @GeneratedValue
    private Long id;
    @JsonProperty("image")
    private String imageUrl;
    /*@ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;*/
}
