import { useEffect, useRef, useState } from "react";
import { userService } from "../../service/UserService";

function UserInfo({ userInfo, isIdentify }) {
  const [newImg, setNewImg] = useState(userInfo.profile_img);
  const [newName, setNewName] = useState(userInfo.nickname);
  const [isEdit, setIsEdit] = useState(false);
  const imgInputRef = useRef();

  useEffect(() => {
    setNewImg(userInfo.profile_img);
    setNewName(userInfo.nickname);
  }, [userInfo.profile_img, userInfo.nickname]);

  const onImageChangeHandler = (event) => {
    const { files } = event.target;
    const file = files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setNewImg(result);
    };

    reader.readAsDataURL(file);
  };

  console.dir(newImg);

  const onNameChangeHandler = (event) => {
    console.log(newName);
    setNewName(event.target.value);
  };

  const onEditToggleHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const onUpdateSubmitHandler = (event) => {
    event.preventDefault();
    if (!isIdentify) return false;

    let imgUrl = "";

    if (newImg !== "") {
      // 이미지 업로드 controller로 연결
    }

    userService.updateUser({
      profile_img: newImg,
      nickname: newName,
    });
  };

  const onClearHandler = () => {
    clearImg();
  };

  const clearImg = () => {
    imgInputRef.current.value = null;
    setNewImg("");
  };

  console.log(isEdit);

  return (
    <div>
      {isIdentify && <button onClick={onEditToggleHandler}>수정하기</button>}
      <form onSubmit={onUpdateSubmitHandler}>
        <div>
          {isEdit ? (
            <>
              <input
                type="file"
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
          ) : userInfo.profile_img ? (
            <img src={userInfo.profile_img} alt="프로필 이미지" />
          ) : (
            "이미지 없음"
          )}
        </div>
        <div>
          닉네임 :
          <input
            type="text"
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

export default UserInfo;
