package com.team.neorangnarang.user.security;

import com.team.neorangnarang.exception.UserNotFoundException;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import com.team.neorangnarang.user.security.auth.service.UserPrincipalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final TokenProvider tokenProvider;
    private final UserPrincipalService userPrincipalsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            log.info("doFilterInternal request : {}", request.getHeader("Authorization"));
            String token = parseBearerToken(request);

            log.info("Jwt Filter is running...");

            AbstractAuthenticationToken authentication = new AnonymousAuthenticationToken(
                    "anonymous", Optional.empty(), Collections.singletonList(new SimpleGrantedAuthority("anonymous"))
            );

            log.info("authentication : {}", authentication);

            if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
                String userId = tokenProvider.validateAndGetUserId(token);

                UserPrincipal userPrincipal = (UserPrincipal) userPrincipalsService.loadUserByUsername(userId);
                /*User setUserToken = User.builder()
                        .token(token)
                        .user_idx(userPrincipal.getUser().getUser_idx())
                        .uid(userPrincipal.getUsername())
                        .password(userPrincipal.getPassword())
                        .phone(userPrincipal.getUser().getPhone())
                        .nickname(userPrincipal.getUser().getNickname())
                        .gender(userPrincipal.getUser().getGender())
                        .profile_img(userPrincipal.getUser().getProfile_img())
                        .role(userPrincipal.getUser().getRole())
                        .provider(userPrincipal.getUser().getProvider())
                        .provider_id(userPrincipal.getUser().getProvider_id())
                        .created_at(userPrincipal.getUser().getCreated_at())
                        .state(userPrincipal.getUser().isState())
                        .build();
                userPrincipal.setUser(setUserToken);*/

                authentication = new UsernamePasswordAuthenticationToken(
                        userPrincipal, null, userPrincipal.getAuthorities()
                );

                log.info("JWT Filter authentication: {}", authentication);

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authentication);
                SecurityContextHolder.setContext(securityContext);
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
            throw new UserNotFoundException("로그인 실패");
        }

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
