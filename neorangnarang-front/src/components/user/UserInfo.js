import { useEffect, useState } from "react";
import { userService } from "../../service/UserService";

function UserInfo({ userInfo, isIdentify }) {
  const [newImg, setNewImg] = useState(userInfo.profile_img);
  const [newName, setNewName] = useState(userInfo.nickname);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setNewImg(userInfo.profile_img);
    setNewName(userInfo.nickname);
  }, [userInfo.profile_img, userInfo.nickname]);

  const onNameChangeHandler = (event) => {
    console.log(newName);
    setNewName(event.target.value);
  };

  const onEditToggleHandler = () => {
    console.log(isEdit);
    setIsEdit((prev) => !prev);
  };

  const onUpdateSubmitHandler = (event) => {
    event.preventDefault();

    if (!isIdentify) {
      return false;
    }

    userService.updateUser({
      profile_img: newImg,
      nickname: newName,
    });
  };

  return (
    <div>
      <form onSubmit={onUpdateSubmitHandler}>
        <div style={{ width: "100px", height: "100px" }}>
          {userInfo.profile_img ? (
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
      </form>
      {isIdentify && <button onClick={onEditToggleHandler}>수정하기</button>}
    </div>
  );
}

export default UserInfo;
