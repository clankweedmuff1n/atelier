package com.back.confectionary.products.Review.service;

import com.back.confectionary.products.Review.Review;
import com.back.confectionary.products.Review.ReviewRequest;

import java.util.List;

public interface ReviewService {
    Review createReview(ReviewRequest reviewRequest);
    List<Review> createReviewAll(List<ReviewRequest> reviewRequests);
}
