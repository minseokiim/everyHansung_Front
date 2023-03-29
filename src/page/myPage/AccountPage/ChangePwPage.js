import axios from "axios";
import { useState } from "react";

const ChangePwPage = () => {
  const [passwd, setOldPasswd] = useState("");
  const [newpasswd, setNewPasswd] = useState("");

  //axios.get으로 내 pw 받아온 후, oldpw에 저장
  //바꾸고 싶은 pw은 newpw에 저장후 patch로 members정보 업데이트 해주기

  return <div>changepw</div>;
};

export default ChangePwPage;
