package com.team.neorangnarang.user.security.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisUtil {
    private final StringRedisTemplate redisTemplate;

    public String getData(String code) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(code);
    }

    public void setData(String code, String email) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(code, email);
    }

    public void setDataExpire(String code, String email, long duration) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(code, email, expireDuration);
    }

    public void deleteData(String code) {
        redisTemplate.delete(code);
    }
}
