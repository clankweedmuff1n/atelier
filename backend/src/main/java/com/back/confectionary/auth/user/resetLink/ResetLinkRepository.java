package com.back.confectionary.auth.user.resetLink;

import com.back.confectionary.auth.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetLinkRepository extends JpaRepository<ResetLink, Integer> {
    Optional<ResetLink> findByUser(User user);
    Optional<ResetLink> findByLink(String link);
}