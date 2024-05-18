package com.back.studio.auth;


import com.back.studio.auth.requests.AuthenticationRequest;
import com.back.studio.auth.responses.AuthenticationResponse;
import com.back.studio.auth.requests.RegisterRequest;
import com.back.studio.auth.user.User;
import com.back.studio.auth.user.UserRepository;
import com.back.studio.auth.user.confirmCode.ConfirmCode;
import com.back.studio.auth.user.confirmCode.ConfirmCodeRepository;
import com.back.studio.auth.user.resetCode.ResetCode;
import com.back.studio.auth.user.resetCode.ResetCodeRepository;
import com.back.studio.auth.user.token.Token;
import com.back.studio.auth.user.token.TokenRepository;
import com.back.studio.auth.user.token.TokenType;
import com.back.studio.configuration.JwtService;
import com.back.studio.email.EmailServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import static com.back.studio.auth.user.Role.USER;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmailServiceImpl emailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final ConfirmCodeRepository confirmCodeRepository;
    private final ResetCodeRepository resetCodeRepository;


    private final RestTemplate restTemplate;

    public AuthenticationResponse register(RegisterRequest request) {
        Random random = new Random();

        var user = User.builder()
                .firstname(request.getFirstname())
                .confirmed(false)
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(USER)
                .build();

        var savedUser = userRepository.save(user);
        var link = ConfirmCode.builder()
                .code(String.valueOf(random.nextInt(900000) + 100000))
                .user(savedUser)
                .build();
        var savedLink = confirmCodeRepository.save(link);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        var email = """
                <div style="width: 100%%; display: flex; margin: 0 auto; justify-content: center; justify-items: center;">
                      <div style="max-width: 600px;">
                        <div style="margin: 0 auto;text-align: center;">
                          <img width="auto" height="auto" style="margin-top:0;margin-right:0;margin-bottom: 0px;margin-left:0px" src="https://x-lines.ru/letters/i/cyrillicscript/0444/030326/20/0/q3zsa5uxq3o1hau1cfzge.png" alt="logo" />
                            <h1>Подтвердите ваш адрес электронной почты</h1>
                          <p style="font-size:20px;line-height:28px;letter-spacing:-0.2px;margin-bottom:28px;word-break:break-word"> Для подтверждения адреса, введите код указанный ниже в окне подтверждения </p>
                        </div>
                        <div style="background:#f5f4f5;border-radius:4px;padding:23px 13px;margin-left:50px;margin-right:50px;margin-bottom:72px;margin-bottom:30px">
                          <div style="color: black; text-align:center;vertical-align:middle;font-size:30px"> %s </div>
                        </div>
                        <div style="margin-left:50px;margin-right:50px;margin-bottom:72px;margin-bottom:30px">
                          <p style="font-size:16px;line-height:24px;letter-spacing:-0.2px;margin-bottom:28px"></p>
                          <p style="font-size:16px;line-height:24px;letter-spacing:-0.2px;margin-bottom:28px"> Если вы не запрашивали подтверждение, не беспокойтесь, вы можете спокойно проигнорировать это письмо. </p>
                          <div>©2024 Вольнова.рф <br>
                          </div>
                          <br>Все права защищены.
                        </div>
                      </div>
                   </div>
                """;
        email = String.format(email, savedLink.getCode());
        emailService.sendSimpleMessage(savedUser.getEmail(), "Account confirmation", email);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .user(savedUser)
                .refreshToken(refreshToken)
                .build();
    }

    public User confirmAccount(String id) {
        var link = confirmCodeRepository.findByCode(id)
                .orElseThrow(() -> new UsernameNotFoundException("Link not found"));
        var user = userRepository.findByConfirmCode(link)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (user.getConfirmed()) throw new UsernameNotFoundException("User is already confirmed");
        user.setConfirmed(true);
        return userRepository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);
            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .user(user)
                    .refreshToken(refreshToken)
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalStateException(e.getMessage());
        }
    }

    public List<User> getUsers(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UsernameNotFoundException("Dont have access");
        }

        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            var userDetails = this.userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                return this.userRepository.findAll();
            }
        }
        throw new UsernameNotFoundException("Dont have access");
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            var userDetails = this.userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                var accessToken = jwtService.generateToken(userDetails);

                var authResponse = AuthenticationResponse.builder()
                        .user(userDetails)
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();

                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }

        }
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }

        validUserTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });

        tokenRepository.saveAll(validUserTokens);
    }

    public void sendResetEmail(String emailAddress) {
        User user = userRepository.findByEmail(emailAddress)
                .orElseThrow(() -> new UsernameNotFoundException("User by email not found"));
        var email = """
                <div style="max-width: 600px;">
                   <div style="margin: 0 auto;text-align: center;">
                      <img width="auto" height="auto"
                         style="margin-top:0;margin-right:0;margin-bottom:32px;margin-left:0px"
                         src="https://i.imgur.com/gCjUQw7.png"
                         alt="logo"/>
                      <h1>Confirm your email address</h1>
                      <p style="font-size:20px;line-height:28px;letter-spacing:-0.2px;margin-bottom:28px;word-break:break-word">
                         To reset your password click on the button below
                      </p>
                   </div>
                   <div
                      style="background:#f5f4f5;border-radius:4px;padding:23px 13px;margin-left:50px;margin-right:50px;margin-bottom:72px;margin-bottom:30px">
                      <a style="cursor: pointer; user-select: none; text-decoration: none" href="%s">
                         <div style="color: black; text-align:center;vertical-align:middle;font-size:30px">
                            Reset Password
                         </div>
                      </a>
                   </div>
                   <div style="margin-left:50px;margin-right:50px;margin-bottom:72px;margin-bottom:30px">
                      <p style="font-size:16px;line-height:24px;letter-spacing:-0.2px;margin-bottom:28px"></p>
                      <p style="font-size:16px;line-height:24px;letter-spacing:-0.2px;margin-bottom:28px">
                         If you didn’t request this email, there’s nothing to worry about — you
                         can safely ignore it.
                      </p>
                      <div>©2024 EngelRealEstate LLC<br>
                      </div>
                      <br>All rights reserved.
                   </div>
                </div>
                """;
        var link = ResetCode.builder()
                .code(UUID.randomUUID().toString())
                .user(user)
                .build();
        var savedLink = resetCodeRepository.save(link);

        email = String.format(email, "https://engelrealestate.us/reset/" + savedLink.getCode());
        emailService.sendSimpleMessage(emailAddress, "Reset your password", email);
    }
}