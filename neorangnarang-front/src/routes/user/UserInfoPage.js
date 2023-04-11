import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthState } from "../../redux/user/selector/authSelector";
import { getUserState } from "../../redux/user/selector/userSelector";
import { getReviewsState } from "../../redux/user/selector/reviewSelector";
import { getUserInfo } from "../../redux/user/thunk/userThunk";
import {
  getReviewsByWriter,
  getUserReviews,
} from "../../redux/user/thunk/reviewThunk";
import UserInfo from "../../components/user/UserInfo";
import ReviewList from "../../components/user/ReviewList";
import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyBoardList from "../../components/user/MyBoardList";
import { boardService } from "../../service/BoardService";

function UserInfoPage() {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postList, setpostList] = useState([]);

  const authUser = useSelector(getAuthState);
  const userInfo = useSelector(getUserState);
  const userReviewList = useSelector(getReviewsState);

  const [mypage, setMypage] = useState(false);
  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    if (!uid) {
      setMypage(true);
      boardService.getBoardListByUid(authUser.uid, (res) => setpostList(res));
    } else {
      if (uid === authUser.uid) {
        navigate("/user/mypage", { replace: true });
      } else {
        setMypage(false);
        dispatch(getUserInfo(uid));
        boardService.getBoardListByUid(uid, (res) => setpostList(res));
      }
    }
  }, [uid, authUser.uid]);

  const onTabChangehandler = (event, newValue) => {
    setTabValue(newValue);
  };

  const getReviews = useCallback(() => {
    dispatch(getReviewsByWriter(!uid ? authUser.user_idx : userInfo.user_idx));
  }, [uid, userReviewList]);

  const getReceivedReviews = useCallback(() => {
    dispatch(getUserReviews(!uid ? authUser.uid : uid));
  }, [uid, userReviewList]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={6}
    >
      <Grid
        item
        style={{ maxWidth: "600px", width: "100%", paddingTop: "30px" }}
      >
        <UserInfo userInfo={!uid ? authUser : userInfo} mypage={mypage} />
      </Grid>
      <Grid item style={{ maxWidth: "716px", width: "100%" }}>
        <TabContext value={tabValue}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <TabList onChange={onTabChangehandler} centered>
              <Tab label="작성글" value="1" />
              <Tab label="찜한글" value="2" />
              <Tab label="작성한평가" value="3" onClick={getReviews} />
              <Tab label="받은평가" value="4" onClick={getReceivedReviews} />
            </TabList>
          </Box>
          <Box>
            <TabPanel value="1">
              <MyBoardList postList={postList} />
            </TabPanel>
            <TabPanel value="2">탭투</TabPanel>
            <TabPanel value="3">
              <ReviewList reviews={userReviewList} />
            </TabPanel>
            <TabPanel value="4">
              <ReviewList reviews={userReviewList} />
            </TabPanel>
          </Box>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default UserInfoPage;
