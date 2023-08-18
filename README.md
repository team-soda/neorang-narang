# neorang-narang
리액트 &amp; 스프링 부트로 만드는 룸메이트 모집 사이트   
   
## 구동을 위한 yaml 설정
application-app.yaml
```yaml
spring:
  config:
    activate:
      on-profile: app
app:
  auth:
    token-secret: 
    token-expiration-msec: 864000000
  cors:
    allowedOrigins: http://localhost:3000, http://localhost:8081
  oauth2:
    authorizedRedirectUris:
      - http://localhost:3000/auth/oauth2/redirect

```

application-db.yaml
```yaml
spring:
  config:
    activate:
      on-profile: db
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: 
    password:
    hikari:
      maximum-pool-size: '3'
    url: jdbc:mysql://
mybatis:
  type-aliases-package: com.team.neorangnarang.user.domain, com.team.neorangnarang.mainboard.dto
  mapper-locations: mapper/*.xml
```

application-mail.yaml
```yaml
spring:
  config:
    activate:
      on-profile: mail
  mail:
    host: smtp.gmail.com
    port: 587
    username: 
    password: 
    properties:
      mail:
        smtp:
          starttls:
            enable: true
            required: true
          auth: true
          connectiontimeout: 5000
          timeout: 5000
          writetimeout: 5000
```

application-oauth.yaml
```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            api-key: 
            client-id: 
            client-secret: 
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
            scope:
              - profile
              - email
              - https://www.googleapis.com/auth/user.gender.read
              - https://www.googleapis.com/auth/user.phonenumbers.read
          kakao:
            client-name: kakao
            client-id: 
            client-secret: 
            client-authentication-method: POST
            authorization-grant-type: authorization_code
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
            scope:
              - profile_nickname
              - profile_image
              - account_email
              - gender
          naver:
            client-name: naver
            client-id: 
            client-secret: 
            authorization-grant-type: authorization_code
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
            scope:
              - email
              - nickname
              - profile_image
              - gender
              - mobile
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-name-attribute: response
```
