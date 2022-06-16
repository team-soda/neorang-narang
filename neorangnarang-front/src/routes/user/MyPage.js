import { AccountCircle } from "@material-ui/icons";

function MyPage({ userObj }) {
  const { user } = userObj.data.objData;

  return (
    <div>
      <div>
        {user.profile_img ? (
          <img src={user.profile_img} alt="프로필 이미지" />
        ) : (
          <AccountCircle />
        )}
      </div>
      <div>닉네임 : {user.nickname}</div>
    </div>
  );
}

export default MyPage;
