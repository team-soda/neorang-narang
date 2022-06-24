import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthFileNameState,
  getAuthImgState,
  getAuthState,
  getDefaultImgState,
  getIsLoginState,
} from "../../redux/user/selector/authSelector";
import {
  getAuthUserImg,
  updateUser,
  uploadProfileImg,
} from "../../redux/user/thunk/authThunk";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { API_BASE_URL } from "../../config/url-config";

function MyInfo({
  authUser,
  isEdit,
  imgPreview,
  profileImgRef,
  newName,
  onImageChangeHandler,
  onNameChangeHandler,
  onUpdateSubmitHandler,
  onClearHandler,
  onEditToggleHandler,
}) {
  const { profile_img } = authUser;
  const defaultImg = useSelector(getDefaultImgState);

  console.log(`${API_BASE_URL}/user/${profile_img}`);

  return (
    <div>
      <button onClick={onEditToggleHandler}>수정하기</button>
      <div>
        {isEdit && (
          <>
            <input
              ref={profileImgRef}
              onChange={onImageChangeHandler}
              name="profile_img"
              id="profile_img"
              type="file"
              accept="image/*"
            />
            <button onClick={onClearHandler}>취소</button>
          </>
        )}
        <div>
          <img
            src={
              imgPreview ||
              (profile_img ? `${API_BASE_URL}/user/${profile_img}` : defaultImg)
            }
            alt="프로필 이미지"
            style={{ width: "150px" }}
          />
        </div>
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
      {isEdit && <button onClick={onUpdateSubmitHandler}>저장하기</button>}
    </div>
  );
}

export default MyInfo;
