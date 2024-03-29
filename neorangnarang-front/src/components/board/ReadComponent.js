import { useEffect, useState } from "react";
import { Parser } from "html-to-react";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import styled from "@emotion/styled";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { boardService } from "../../service/BoardService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  getDefaultImgState,
  getIsLoginState,
} from "../../redux/user/selector/authSelector";
import { Link, useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";
import { API_BASE_URL } from "../../config/url-config";
import { getUserState } from "../../redux/user/selector/userSelector";
import { getUserInfo } from "../../redux/user/thunk/userThunk";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Checkbox } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ReadComponent = ({ board_idx, isChecked, onChangeChecked }) => {
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthState);
  const userInfo = useSelector(getUserState);
  const defaultImg = useSelector(getDefaultImgState);
  const isLogin = useSelector(getIsLoginState);
  const navigate = useNavigate();

  const boardDTOState = {
    imageTags: "",
    dto: [],
  };

  const [boardDTO, setBoardDTO] = useState(boardDTOState);
  const [expanded, setExpanded] = useState(false);
  //const [isWishAdd, setIsWishAdd] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/auth/signin", { replace: true });
    } else {
      boardService.getBoardRead(board_idx).then((res) => {
        setBoardDTO(res.data);
        dispatch(getUserInfo(res.data.dto.uid));
      });
    }
    //imgCheck();
  }, [board_idx, isLogin, isChecked]);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // 글에 등록된 이미지가 없을 경우 이미지 대체
  /* const imgCheck = () => {
        if (boardDTO.imageTags.length < 1) {
          document.querySelector(
            ".centered"
          ).innerHTML = `<img src="https://img.apti.co.kr/aptHome/images/sub/album_noimg.gif">`;
        }
      }; */

  const onRemoveHandler = () => {
    boardService.removeBoard(boardDTO);
    window.location = `/mainboard/list`;
    alert("삭제가 완료되었습니다!");
  };

  return (
    <Card>
      <CardHeader title={boardDTO.dto.title} />
      <CardHeader
        avatar={
          <Avatar
            src={
              userInfo.profile_img
                ? `${API_BASE_URL}/view/${userInfo.profile_img}`
                : defaultImg
            }
            sx={{ bgcolor: red[500] }}
            aria-label="userProfile"
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={boardDTO.dto.writer}
        subheader={boardDTO.dto.created_dt}
      />
      <div className="thumbnail-wrapper">
        <div className="thumbnail">
          <div className="centered">
            <CardMedia
              className="cardImg"
              component="img"
              image={
                boardDTO.imageTags
                  ? boardDTO.imageTags[0]
                  : "https://img.apti.co.kr/aptHome/images/sub/album_noimg.gif"
              }
            />
          </div>
        </div>
      </div>
      <Box
        sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}
      >
        <CardContent>
          <Typography variant="body2" color="secondary">
            전·월세
          </Typography>
          <Typography variant="h6" color="secondary">
            {boardDTO.dto.pay_division}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="secondary">
            평수
          </Typography>
          <Typography variant="h6" color="secondary">
            {boardDTO.dto.square_feet}평
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="secondary">
            금액
          </Typography>
          <Typography variant="h6" color="secondary">
            {boardDTO.dto.price}만원
          </Typography>
        </CardContent>
      </Box>
      <CardActions disableSpacing>
        <Checkbox
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={isChecked}
          onChange={onChangeChecked}
        />{" "}
        {boardDTO.dto.like_count}
        <IconButton>
          <VisibilityIcon />
        </IconButton>{" "}
        {boardDTO.dto.view_count}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        펼쳐보기
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          style={{
            border: "1px solid whitesmoke",
            borderRadius: 20,
            padding: 40,
            margin: "30px 0px",
          }}
        >
          <Typography paragraph>
            {Parser().parse(boardDTO.dto.content)}
          </Typography>
        </CardContent>
        <CardContent style={{ padding: 10 }}>
          <Typography variant="body2" color="secondary">
            <Button>
              <LocationOnIcon />
              {boardDTO.dto.short_location}
            </Button>
            <Typography variant="caption">
              개인 정보 보호를 위해, 상세 주소는 작성자와 문의하세요!
            </Typography>
          </Typography>
        </CardContent>
        <MapComponent mapLocation={boardDTO.dto.short_location} />
      </Collapse>
      <CardActions className="menuBar">
        <div>
          <Button color="secondary" href="/mainboard/list">
            돌아가기
          </Button>
        </div>
        <div>
          {authUser.uid === boardDTO.dto.uid ? (
            <div>
              <Button>
                <Link
                  to={`/mainboard/modify/${boardDTO.dto.board_idx}`}
                  style={{ textDecoration: "none", color: "#f50057" }}
                >
                  수정
                </Link>
              </Button>
              <Button color="secondary" onClick={onRemoveHandler}>
                삭제
              </Button>
            </div>
          ) : (
            <div />
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default ReadComponent;
