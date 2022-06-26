package com.team.neorangnarang.user.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.exception.BadRequestException;
import com.team.neorangnarang.user.domain.Review;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.dto.ReviewDTO;
import com.team.neorangnarang.user.dto.UserDTO;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import com.team.neorangnarang.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> registerReview(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                            @RequestBody ReviewDTO reviewDTO) {
        log.info("registerReview userPrincipal: {}", userPrincipal.toString());
        log.info("registerReview reviewDTO: {}", reviewDTO.toString());
        ResponseDTO<ReviewDTO> response;
        try {
            Review review = ReviewDTO.toReview(reviewDTO);

            if (review.getWriter_idx() != userPrincipal.getUser().getUser_idx()) {
                throw new BadRequestException("잘못된 요청입니다.");
            }

            List<Review> reviews = userService.registerReview(review);
            List<ReviewDTO> dtos = reviews.stream().map(ReviewDTO::new).collect(Collectors.toList());
            response = ResponseDTO.<ReviewDTO>builder().listData(dtos).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDTO.<ReviewDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{uid}")
    public ResponseEntity<?> getUserReviews(@PathVariable("uid") String uid) {
        log.info("getUserReviews uid: {}", uid);
        ResponseDTO<ReviewDTO> response = null;
        try {
            User user = User.builder().uid(uid).build();
            List<Review> reviews = userService.getUserReviewList(user);
            List<ReviewDTO> dtos = reviews.stream().map(ReviewDTO::new).collect(Collectors.toList());
            response = ResponseDTO.<ReviewDTO>builder().listData(dtos).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDTO.<ReviewDTO>builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(response);
        }
    }

    /*@PostMapping("/findWriterInfo")
    public ResponseEntity<?> getWriterInfo(@RequestBody UserDTO userDTO) {
        log.info("getWriterInfo userDTO: {}", userDTO.toString());
        User user = UserDTO.toUser(userDTO);
        return ResponseEntity.ok(userService.getUserInfoByIdx(user));
    }*/
}
