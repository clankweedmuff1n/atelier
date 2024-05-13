package com.back.confectionary.auth;

import com.back.confectionary.auth.user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authService.refreshToken(request, response);
    }

    @GetMapping("/users")
    public List<User> getUsers(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        return authService.getUsers(request, response);
    }

    @GetMapping("/confirm/{id}")
    public User confirmAccount(
            HttpServletRequest request,
            HttpServletResponse response,
            @PathVariable String id
    ) {
        return authService.confirmAccount(id);
    }
}