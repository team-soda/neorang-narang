import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { boardService } from "../../service/BoardService";
import Carousel from "../../components/main/Carousel";
import { Link } from "react-router-dom";

export default function Home() {
  //const boardInfoState = { dtoList: [] };
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    boardService.getBoardList().then((res) => {
      setBoardList(res.data.dto.dtoList);
    });
  }, [setBoardList]);

  return (
    <main>
      <Carousel />
      <Container style={{ padding: "initial" }} maxWidth="md">
        <Grid container spacing={5}>
          {boardList.map((board) => (
            <Grid item key={board.title} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  maxHeight: "100%",
                  display: "flex",
                  mt: "15%",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ maxWidth: "100%", maxHeight: 200 }}
                  image={board.imageTags[0]}
                />
                <CardContent sx={{ flexGrow: 1, color: "magenta" }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {board.title}
                  </Typography>
                  <Typography>
                    {board.pay_division} | {board.square_feet}평 | {board.price}
                    만원
                  </Typography>
                  <Typography>{board.short_location}</Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/mainboard/read/${board.board_idx}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button sx={{ color: "#ffc576" }} size="small">
                      보기
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
