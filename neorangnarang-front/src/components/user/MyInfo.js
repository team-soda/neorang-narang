import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthFileNameState,
  getAuthImgState,
  getAuthState,
  getIsLoginState,
} from "../../redux/user/selector/authSelector";
import {
  getAuthUserImg,
  updateUser,
  uploadProfileImg,
} from "../../redux/user/thunk/authThunk";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function MyInfo() {
  const dispatch = useDispatch();
  const authInfo = useSelector(getAuthState);
  const fileName = useSelector(getAuthFileNameState);
  const profileImgView = useSelector(getAuthImgState);
  const isLogin = useSelector(getIsLoginState);
  const tempPath = useSelector((state) => state.auth.tempPath);
  const [newImg, setNewImg] = useState(profileImgView ?? "");
  const [newName, setNewName] = useState(authInfo.nickname ?? "");
  const [isImg, setIsImg] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const imgInputRef = useRef();
  const navigate = useNavigate();

  const getImg = useCallback(() => {
    dispatch(getAuthUserImg(fileName));
  }, [dispatch, fileName]);

  useEffect(() => {
    if (tempPath === authInfo.profile_img) {
      getImg();
    }
  }, [tempPath, authInfo.profile_img, getImg]);

  const onImageChangeHandler = (event) => {
    const { files } = event.target;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setNewImg(result);
      setIsImg(true);
    };

    console.log(reader);
    reader.readAsDataURL(file);
  };

  const onNameChangeHandler = (event) => {
    console.log(newName);
    setNewName(event.target.value);
  };

  const onEditToggleHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const onUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isLogin) return false;

    let imgPath = "";

    if (isImg) {
      // 이미지 업로드 controller로 연결
      const { files } = imgInputRef.current;
      const file = files[0];
      const { name, size } = file;
      console.dir(file);
      const imgObj = {
        originName: name,
        newName: `${authInfo.uid}_${uuidv4()}_${name}`,
        size,
        path: newImg.split(",")[1],
      };

      imgPath = await dispatch(uploadProfileImg(imgObj));
      console.log(imgPath.payload.path);
    }

    await dispatch(
      updateUser({
        profile_img: imgPath ? imgPath.payload.path : authInfo.profile_img,
        nickname: newName,
      })
    );

    alert("수정 완료!");
    setIsEdit(false);
    setIsImg(false);
    navigate("/user/mypage", { replace: true });
  };

  const onClearHandler = () => {
    clearImg();
  };

  const clearImg = () => {
    imgInputRef.current.value = null;
    setNewImg("");
    setIsImg(false);
  };

  console.log(isEdit);

  return (
    <div>
      <button onClick={onEditToggleHandler}>수정하기</button>
      <form onSubmit={onUpdateSubmitHandler}>
        <div>
          {isEdit ? (
            <>
              <input
                type="file"
                name="profile_img"
                accept="image/*"
                ref={imgInputRef}
                onChange={onImageChangeHandler}
              />
              <button onClick={onClearHandler}>취소</button>
              <div>
                <img
                  src={newImg}
                  style={{
                    backgroundImage: newImg,
                    width: "100px",
                    height: "100px",
                  }}
                  alt="사진 미리보기"
                />
              </div>
            </>
          ) : profileImgView ? (
            <div style={{ width: "100px", height: "100px" }}>
              <img
                src={profileImgView}
                alt="프로필 이미지"
                style={{ width: "100%" }}
              />
            </div>
          ) : (
            <div style={{ width: "100px", height: "100px" }}>
              <img
                src="https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png"
                alt="프로필 이미지"
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>
        <div>
          닉네임 :
          <input
            type="text"
            name="nickname"
            value={newName}
            onChange={onNameChangeHandler}
            readOnly={!isEdit}
          />
        </div>
        {isEdit && <button type="submit">저장하기</button>}
      </form>
    </div>
  );
}

export default MyInfo;
