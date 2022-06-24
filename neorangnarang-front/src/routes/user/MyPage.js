import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthState } from "../../redux/user/selector/authSelector";
import { getAuthUser, updateUser } from "../../redux/user/thunk/authThunk";
import MyInfo from "../../components/user/MyInfo";

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileImgRef = useRef();

  const authUser = useSelector(getAuthState);

  /* const fileName = useSelector(getAuthFileNameState);
  const profileImgView = useSelector(getAuthImgState);
  const isLogin = useSelector(getIsLoginState);
  const tempPath = useSelector((state) => state.auth.tempPath);
  console.log(authInfo); */

  const [newName, setNewName] = useState(authUser && authUser.nickname);
  const [imgPreview, setImgPreview] = useState(null);

  const [isImg, setIsImg] = useState(false);

  console.log(authUser);

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

  /* const initState = useCallback(() => {
    if (authInfo) {
      setNewImg(authInfo.profile_img);
      setNewName(authInfo.nickname);
    }
  }, [authInfo]); */

  /* const getImg = useCallback(() => {
    dispatch(getAuthUserImg(fileName));
  }, [dispatch, fileName]);
  useEffect(() => {
    initState();
    getImg();
  }, [getImg, initState]); */

  /* console.log(authInfo.profile_img);
  console.log(fileName);
  console.log(tempPath);
  console.log(profileImgView); */

  /* const onImageChangeHandler = (event) => {
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
  }; */
  const onImageChangeHandler = useCallback(() => {
    const reader = new FileReader();
    const file = profileImgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
  }, [profileImgRef, imgPreview]);

  const onNameChangeHandler = useCallback(
      (event) => {
        console.log(newName);
        setNewName(event.target.value);
      },
      [newName]
  );

  /* const onUpdateSubmitHandler = async (event) => {
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
  }; */

  const onUpdateSubmitHandler = useCallback(() => {
    const formData = new FormData();
    formData.append("profile_img", profileImgRef.current.files[0]);
    formData.append("nickname", newName);

    console.log("데이터확인확인");
    console.log(formData.get("profile_img"));
    console.log(formData.get("nickname"));

    //dispatch(updateUser({ authInfo: formData }));
    dispatch(updateUser(formData));
  }, [newName, profileImgRef]);

  const onClearHandler = () => {
    clearImg();
  };

  const clearImg = () => {
    profileImgRef.current.value = null;
    setImgPreview(null);
    setIsImg(false);
  };

  return (
      <div>
        <MyInfo
            authUser={authUser}
            imgPreview={imgPreview}
            profileImgRef={profileImgRef}
            newName={newName}
            onImageChangeHandler={onImageChangeHandler}
            onNameChangeHandler={onNameChangeHandler}
            onUpdateSubmitHandler={onUpdateSubmitHandler}
            onClearHandler={onClearHandler}
        />
      </div>
  );
}

export default MyPage;