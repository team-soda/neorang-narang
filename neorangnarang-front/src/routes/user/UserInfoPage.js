import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserState } from "../../redux/user/selector/userSelector";
import { getReviewsState } from "../../redux/user/selector/reviewSelector";
import { getUserInfo } from "../../redux/user/thunk/userThunk";
import {
  getReviewsByWriter,
  getUserReviews,
} from "../../redux/user/thunk/reviewThunk";
import UserInfo from "../../components/user/UserInfo";
import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyReviews from "../../components/user/MyReviews";

function UserInfoPage() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserState);
  const userReviewList = useSelector(getReviewsState);

  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    dispatch(getUserInfo(uid));
  }, [uid, dispatch]);

  const onTabChangehandler = (event, newValue) => {
    setTabValue(newValue);
  };

  const getReviews = useCallback(() => {
    dispatch(getReviewsByWriter({ user_idx: userInfo.user_idx }));
  }, [dispatch, userInfo.user_idx]);

  const getUserReceivedReviews = useCallback(() => {
    dispatch(getUserReviews(uid));
  }, [dispatch, uid]);

  console.log(uid);
  console.log(userInfo);

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
        <UserInfo userInfo={userInfo} uid={uid} />
      </Grid>
      <Grid item style={{ maxWidth: "716px", width: "100%" }}>
        <TabContext value={tabValue}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <TabList onChange={onTabChangehandler} centered>
              <Tab label="작성글" value="1" />
              <Tab label="찜한글" value="2" />
              <Tab label="작성한평가" value="3" onClick={getReviews} />
              <Tab
                label="받은평가"
                value="4"
                onClick={getUserReceivedReviews}
              />
            </TabList>
          </Box>
          <Box>
            <TabPanel value="1">탭원</TabPanel>
            <TabPanel value="2">탭투</TabPanel>
            <TabPanel value="3">
              <MyReviews reviewList={userReviewList} />
            </TabPanel>
            <TabPanel value="4">
              <MyReviews reviewList={userReviewList} />
            </TabPanel>
          </Box>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default UserInfoPage;
