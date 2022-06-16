function MyPage({ userObj }) {
  const { user } = userObj.data.objData;

  return (
    <div>
      <div>
        <img
          src={
            user.profile_img
              ? user.profile_img
              : "https://img.apti.co.kr/aptHome/images/sub/album_noimg.gif"
          }
          alt="프로필 이미지"
        />
      </div>
      <div>닉네임 : {user.nickname}</div>
    </div>
  );
}

export default MyPage;
