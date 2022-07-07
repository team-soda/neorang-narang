import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyInfo from "../../components/user/MyInfo";
import MyReviews from "../../components/user/MyReviews";
import { getReviewsByWriter } from "../../redux/user/thunk/reviewThunk";
import { getAuthState } from "../../redux/user/selector/authSelector";
import { getReviewsState } from "../../redux/user/selector/reviewSelector";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function MyPage() {
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthState);
  const myReviewList = useSelector(getReviewsState);
  const [tabValue, setTabValue] = useState("1");

  const onTabChangehandler = (event, newValue) => {
    setTabValue(newValue);
  };

  const getMyReviews = useCallback(() => {
    dispatch(getReviewsByWriter({ user_idx: authUser.user_idx }));
  }, [dispatch, authUser.user_idx]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={6}
    >
      <Grid item>
        <MyInfo authUser={authUser} />
      </Grid>
      <Grid item style={{ maxWidth: "616px", width: "100%" }}>
        <TabContext value={tabValue}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <TabList onChange={onTabChangehandler} centered>
              <Tab label="내가 쓴 글" value="1" />
              <Tab label="내가 찜한 글" value="2" />
              <Tab label="내가 쓴 평가" value="3" onClick={getMyReviews} />
            </TabList>
          </Box>
          <Box>
            <TabPanel value="1">탭원</TabPanel>
            <TabPanel value="2">탭투</TabPanel>
            <TabPanel value="3">
              <MyReviews myReviewList={myReviewList} />
            </TabPanel>
          </Box>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default MyPage;
