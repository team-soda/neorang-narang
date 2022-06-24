package com.team.neorangnarang.user.security;

import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import com.team.neorangnarang.user.security.oauth2.AppProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Log4j2
@Service
@RequiredArgsConstructor
public class TokenProvider {
    private final AppProperties appProperties;

    public String create(Authentication authentication) {
        log.info("TokenProvider create authentication: {}", authentication.getPrincipal());

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date expiryDate = new Date(new Date().getTime() +
                appProperties.getAuth().getTokenExpirationMsec());

        return Jwts.builder()
                .signWith(createKey(appProperties.getAuth().getTokenSecret()), SignatureAlgorithm.HS512)
                .setSubject(userPrincipal.getUser().getUid())
                .setIssuer("neorang narang")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }

    public String validateAndGetUserId(String token) {
        log.info("TokenProvider validateAndGetUserId token: {}", token);
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(createKey(appProperties.getAuth().getTokenSecret()))
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public Key createKey(String tokenSecret) {
        byte[] keyBytes = tokenSecret.getBytes();
        Key key = Keys.hmacShaKeyFor(keyBytes);
        return key;
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(createKey(appProperties.getAuth().getTokenSecret())).build().parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            log.error("잘못된 서명입니다.");
        } catch (MalformedJwtException ex) {
            log.error("올바른 토큰 형식이 아닙니다.");
        } catch (ExpiredJwtException ex) {
            log.error("만료된 토큰입니다.");
        } catch (UnsupportedJwtException ex) {
            log.error("지원되지 않는 토근 형식입니다.");
        } catch (IllegalArgumentException ex) {
            log.error("토큰이 존재하지 않습니다.");
        }

        return false;
    }

}
