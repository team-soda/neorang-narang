package com.team.neorangnarang.user.security;

import com.team.neorangnarang.user.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@Log4j2
@Service
public class TokenProvider {
    private static final String SECRET_KEY = "GBFVujik493e5tio0GUIGfu";

    public String create(User user) {
        log.info("TokenProvider create user: {}", user.getId());
        Date expiryDate = Date.from(
                Instant.now().plus(1, ChronoUnit.DAYS)
        );

        /*String stringKey = Base64Utils.encodeToUrlSafeString(
                Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded());
        log.info("stringKey: {}", stringKey);

        SecretKey secretKey = Keys.hmacShaKeyFor(Base64Utils.decodeFromUrlSafeString(stringKey));
        log.info("secretKey: {}", secretKey);*/

        //SecretKey secretKey = Keys.hmacShaKeyFor(Base64Utils.decodeFromUrlSafeString(user.getToken()));

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(user.getId())
                .setIssuer("demo app")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }

    public String validateAndGetUserId(String token) {
        log.info("TokenProvider validateAndGetUserId token: {}", token);
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

}
