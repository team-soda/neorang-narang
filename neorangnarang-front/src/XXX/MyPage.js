import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyInfo from "./MyInfo";
import ReviewList from "../components/user/ReviewList";
import {
  getReviewsByWriter,
  getUserReviews,
} from "../redux/user/thunk/reviewThunk";
import { getAuthState } from "../redux/user/selector/authSelector";
import { getReviewsState } from "../redux/user/selector/reviewSelector";
import { Box, Grid, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";

function MyPage() {
  const param = useParams();
  console.log(param);

  const dispatch = useDispatch();
  const authUser = useSelector(getAuthState);
  const myReviewList = useSelector(getReviewsState);
  const [tabValue, setTabValue] = useState("1");

  const onTabChangehandler = (event, newValue) => {
    setTabValue(newValue);
  };

  const getMyReviews = useCallback(() => {
    dispatch(getReviewsByWriter(authUser.user_idx));
  }, [dispatch, authUser.user_idx]);

  const getMyReceivedReviews = useCallback(() => {
    dispatch(getUserReviews(authUser.uid));
  }, [dispatch, authUser.uid]);

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
        <MyInfo authUser={authUser} />
      </Grid>
      <Grid item style={{ maxWidth: "716px", width: "100%" }}>
        <TabContext value={tabValue}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <TabList onChange={onTabChangehandler} centered>
              <Tab label="작성글" value="1" />
              <Tab label="찜한글" value="2" />
              <Tab label="작성한평가" value="3" onClick={getMyReviews} />
              <Tab label="받은평가" value="4" onClick={getMyReceivedReviews} />
            </TabList>
          </Box>
          <Box>
            <TabPanel value="1">탭원</TabPanel>
            <TabPanel value="2">탭투</TabPanel>
            <TabPanel value="3">
              <ReviewList reviews={myReviewList} />
            </TabPanel>
            <TabPanel value="4">
              <ReviewList reviews={myReviewList} />
            </TabPanel>
          </Box>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default MyPage;
