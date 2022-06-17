import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/user/UserInfo";
import { userService } from "../../service/UserService";

function MyPage({ authUser }) {
  const { uid } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [isIdentify, setIsIdentify] = useState(false);

  useEffect(() => {
    userService.getUserByUid(uid).then((res) => {
      console.log(res);
      setUserInfo(res.data.objData);
    });
  }, [uid]);

  console.log(userInfo);

  useEffect(() => {
    uid === authUser.uid ? setIsIdentify(true) : setIsIdentify(false);
  }, [uid, authUser.uid]);

  return (
    <div>
      <UserInfo userInfo={userInfo} isIdentify={isIdentify} />
    </div>
  );
}

export default MyPage;
