import ReadComponent from "../../components/board/ReadComponent";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
import { favoriteService } from "../../service/FavoriteService";
import { useSelector } from "react-redux";
import { getAuthState } from "../../redux/user/selector/authSelector";
import { boardService } from "../../service/BoardService";

const BoardReadPage = () => {
  const { board_idx } = useParams();
  const authUser = useSelector(getAuthState);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getFavoritItem();
  }, [board_idx]);

  // 현재 게시글에 좋아요를 누른 상태인지 아닌지 조회
  const getFavoritItem = useCallback(async () => {
    const obj = {
      fk_uid: authUser.uid,
      fk_board_idx: parseInt(board_idx),
    };

    await favoriteService.getFavoriteItem(obj, (res) => {
      if (res.status === 200) setIsChecked(true);
      else setIsChecked(false);
    });
  }, [authUser.uid, board_idx]);

  // 좋아요(찜) 토글 기능
  const onChangeChecked = async () => {
    const obj = {
      fk_uid: authUser.uid,
      fk_board_idx: parseInt(board_idx),
    };

    // 좋아요를 안 누른 상태 일 때 누르면 좋아요 +1
    if (!isChecked) {
      await favoriteService.insertFavorite(obj);
      const res = await boardService.putLikeCount(obj.fk_board_idx);
      if (res.status === 200) setIsChecked(true);
    } else {
      // 좋아요를 누른 상태 일 때 누르면 좋아요 -1 (좋아요 해제)
      await favoriteService.deleteFavorite(obj);
      const res = await boardService.putLikeCount(obj.fk_board_idx);
      if (res.status === 200) setIsChecked(false);
    }
  };

  return (
    <Grid
      component="main"
      style={{
        justifyContent: "center",
        padding: "40px 90px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <ReadComponent
        board_idx={board_idx}
        isChecked={isChecked}
        onChangeChecked={onChangeChecked}
      />
    </Grid>
  );
};

export default BoardReadPage;
