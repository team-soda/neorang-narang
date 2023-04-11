import Slider from "react-slick";
import * as React from "react";
import { Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <Card
            sx={{ maxHeight: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              image="img/roommate.png"
              sx={{
                width: 1100,
                height: 351,
              }}
            />
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              ></Typography>
              <Typography gutterBottom variant="h5" component="h2">
                내게 딱 맞는 룸메이트를 찾고 있다면?
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                금액, 성별, 우리만의 취미! 나만의 룸메이트를 찾아보세요.
              </Typography>
              <Button variant="contained" color={"warning"}>
                <Link
                  to="/mainboard/register"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  룸메이트 구하기!
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card
            sx={{ maxHeight: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              image="https://s.zigbang.com/v1/web/main/hero_img_1440.jpg"
            />
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              ></Typography>
              <Typography gutterBottom variant="h5" component="h2">
                방을 찾고 있다면?
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                지역, 금액, 평수, 성별? 원하는 조건 그대로! 지금 너랑나랑에서
                찾아보세요.
              </Typography>
              <Button variant="contained" color={"warning"}>
                <Link
                  to="/mainboard/list"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  나만의 방 찾아보기!
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
