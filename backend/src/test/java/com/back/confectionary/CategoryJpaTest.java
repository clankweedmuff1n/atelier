package com.back.confectionary;

import com.back.confectionary.products.Category.Category;
import com.back.confectionary.products.Category.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class CategoryJpaTest {
    private final CategoryRepository repository;

    @Test
    void getAllCategories() {
        Category category = Category.builder()
                .name("test")
                .description("test")
                .build();
        repository.save(category);
        System.out.println("SIZE " + repository.findAll().size());
    }
}
