import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthState } from "../../redux/user/selector/authSelector";
import { updateUser } from "../../redux/user/thunk/authThunk";
import MyInfo from "../../components/user/MyInfo";

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileImgRef = useRef();

  const authUser = useSelector(getAuthState);

  const [newName, setNewName] = useState(authUser && authUser.nickname);
  const [imgPreview, setImgPreview] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  console.log(authUser);

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

  const onUpdateSubmitHandler = useCallback(() => {
    const formData = new FormData();
    formData.append("profile_img", profileImgRef.current.files[0]);
    formData.append("nickname", newName);

    const updateObj = {
      file: formData.get("profile_img"),
      nickname: formData.get("nickname"),
    };

    dispatch(updateUser(updateObj));
    setIsEdit(false);
    navigate("/user/mypage", { replace: true });
  }, [newName, profileImgRef]);

  const onClearHandler = () => {
    clearImg();
  };

  const clearImg = () => {
    profileImgRef.current.value = null;
    setImgPreview(null);
  };

  const onEditToggleHandler = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div>
      <MyInfo
        authUser={authUser}
        isEdit={isEdit}
        imgPreview={imgPreview}
        profileImgRef={profileImgRef}
        newName={newName}
        onImageChangeHandler={onImageChangeHandler}
        onNameChangeHandler={onNameChangeHandler}
        onUpdateSubmitHandler={onUpdateSubmitHandler}
        onClearHandler={onClearHandler}
        onEditToggleHandler={onEditToggleHandler}
      />
    </div>
  );
}

export default MyPage;
