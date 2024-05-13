package com.back.confectionary.products.Review.service;

import com.back.confectionary.products.Review.Review;
import com.back.confectionary.products.Review.ReviewRepository;
import com.back.confectionary.products.Review.ReviewRequest;
import com.back.confectionary.products.Review.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper mapper;

    public Review createReview(ReviewRequest reviewRequest) {
        return reviewRepository.save(mapper.toReview(reviewRequest));
    }

    public List<Review> createReviewAll(List<ReviewRequest> reviewRequests) {
        return reviewRepository.saveAll(reviewRequests.stream().map(mapper::toReview).toList());
    }
}
