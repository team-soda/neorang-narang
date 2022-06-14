import React, {useEffect, useState} from 'react';
import BoardService from "../../service/BoardService";
import {Parser} from "html-to-react";
import {
    Avatar, Box, Button,
    CardActions,
    CardContent, CardHeader,
    CardMedia,
    Collapse, createTheme,
    IconButton,
    Typography
} from "@material-ui/core";
import Card from "@mui/material/Card";
import styled from "@emotion/styled";
import {red} from "@material-ui/core/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ReadComponent = ({board_idx, location}) => {

    const {boardInfo, boardDTO, setBoardDTO, getBoardRead, removeBoard} = BoardService();

    useEffect(() => {
        getBoardRead(board_idx)
        imgCheck()
    }, [board_idx])

    const ExpandMore = styled((props) => {
        const {expand, ...other} = props;
        return <IconButton {...other} />;
    })(({theme, expand}) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // 글에 등록된 이미지가 없을 경우 이미지 대체
    function imgCheck() {
        if (boardDTO.imageTags.length<1) {
            document.querySelector('.centered').innerHTML =
                `<img src="https://img.apti.co.kr/aptHome/images/sub/album_noimg.gif">`;
        }
    }

    return (
        <Card>
            <CardHeader title={boardDTO.dto.title}/>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        P
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={boardDTO.dto.writer}
                subheader={boardDTO.created_dt}
            />
            <div class="thumbnail-wrapper">
                <div class="thumbnail">
                    <div class="centered">
                        <CardMedia
                            className="cardImg"
                            component="img"
                            image={boardDTO.imageTags}
                        />
                    </div>
                </div>
            </div>
            <Box sx={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        전·월세
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {boardDTO.dto.pay_division}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        평수
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {boardDTO.dto.square_feet}평
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        금액
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {boardDTO.dto.price}원
                    </Typography>
                </CardContent>
            </Box>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton> {boardDTO.dto.like_count}
                <IconButton>
                    <VisibilityIcon/>
                </IconButton> {boardDTO.dto.view_count}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Detail:</Typography>
                    <Typography paragraph>
                        {Parser().parse(boardDTO.dto.content)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Button><LocationOnIcon/>{boardDTO.dto.location}</Button>
                        <Typography variant="caption">개인 정보 보호를 위해, 상세 주소는 작성자와 문의하세요!</Typography>
                    </Typography>
                </CardContent>
            </Collapse>
            <CardActions className="menuBar">
                <div>
                    <Button color="secondary" href="/mainboard/list">돌아가기</Button>
                </div>
                <div>
                    <Button color="secondary" href={`/mainboard/modify/${boardDTO.dto.board_idx}`}>수정</Button>
                    <Button color="secondary" onClick={removeBoard}>삭제</Button>
                </div>
            </CardActions>
        </Card>
    )
        ;
};

export default ReadComponent;