import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import {boardService} from "../../service/BoardService";
import Carousel from "../../components/main/Carousel";
import {Link} from "react-router-dom";

export default function Home() {

    const boardInfoState = {
        // board_idx:0,
        // title:"",
        // writer:"",
        // location:"",
        // short_location:"",
        // square_feet:"",
        // pay_division:"",
        // imageTags:[];
        dtoList: [],
    };

    const [boardList, setBoardList] = useState(boardInfoState);

    useEffect(() => {
        boardService.getBoardList().then((res) => {
            setBoardList(res.data.dto);
        });
    }, [setBoardList]);

    const imageTagsList = boardList.dtoList.map((imageList) => {
        return imageList.imageTags;
    })

    console.log('제발..' + JSON.stringify(imageTagsList));

    return (
        <main>
            <Carousel/>
            <Container style={{padding: 'initial'}} maxWidth="md">
                <Grid container spacing={4}>
                    {boardList.dtoList.map((board) => (
                        <Grid item key={board.title} xs={12} sm={6} md={4}>
                            <Card
                                sx={{maxHeight: '100%', display: 'flex', flexDirection: 'column'}}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{pt: '56.25%'}}
                                    image={imageTagsList}
                                />
                                {/*<CardHeader*/}
                                {/*    avatar={*/}
                                {/*        <Avatar sx={{bgcolor: red[500]}} aria-label="userProfile"></Avatar>*/}
                                {/*    }*/}
                                {/*    title={board.writer}*/}
                                {/*    subheader={board.view_count}*/}
                                {/*/>*/}
                                <CardContent sx={{flexGrow: 1, color: 'magenta'}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {board.title}
                                    </Typography>
                                    <Typography>
                                        {board.pay_division} | {board.square_feet}평 | {board.price}만원
                                    </Typography>
                                    <Typography>{board.short_location}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/mainboard/read/${board.board_idx}`} style={{textDecoration: 'none'}}>
                                        <Button sx={{color: '#ffc576'}} size="small">보기</Button>
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
