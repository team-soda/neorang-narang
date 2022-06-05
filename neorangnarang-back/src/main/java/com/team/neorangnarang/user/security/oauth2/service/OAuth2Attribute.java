package com.team.neorangnarang.user.security.oauth2.service;

import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.security.oauth2.domain.SocialUser;
import com.team.neorangnarang.user.domain.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.UUID;

@Log4j2
@Getter
@ToString
@Builder(access = AccessLevel.PRIVATE)
public class OAuth2Attribute {
    private Map<String, Object> attributes;
    private String attributeKey;
    /*private String email;
    private String name;
    private String picture;*/

    private User user;

    static OAuth2Attribute of(String provider, String attributeKey, Map<String, Object> attributes) {
        log.info("OAuth2Attribute of sub: {}", attributes.get("sub"));
        String googleId = provider + "_" + attributes.get("sub");
        log.info("googleId : {}", googleId);
        switch (provider) {
            case "google":
                return ofGoogle(attributeKey, attributes, googleId);
            default:
                throw new RuntimeException();
        }
    }

    private static OAuth2Attribute ofGoogle(String attributeKey, Map<String, Object> attributes, String googleId) {
        log.info("ofGoogle attributeKey: {}", attributeKey);
        log.info("ofGoogle attributes: {}", attributes);

        String uuidPw = UUID.randomUUID().toString();
        log.info("UUID PW : {}", uuidPw);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User userInfo = User.builder()
                .id(googleId)
                .nickname(googleId)
                .password(passwordEncoder.encode(uuidPw))
                .phone("0100000000")    // 임의로 지정함. 추후 수정 예정.
                .profile_img((String) attributes.get("picture"))
                .role(Role.USER)
                .provider(ProviderType.GOOGLE)
                .build();

        return OAuth2Attribute.builder()
                .user(userInfo)
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .id(user.getId())
                .password(user.getPassword())
                .phone(user.getPhone())
                .nickname(user.getNickname())
                .profile_img(user.getProfile_img())
                .role(user.getRole())
                .provider(user.getProvider())
                .build();
    }
}
