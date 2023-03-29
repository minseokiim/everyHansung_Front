import axios from "axios";
import { useState } from "react";

const ChangeEmailPage = () => {
  const [oldemail, setOldemail] = useState("");
  const [newemail, setNewemail] = useState("");

  //axios.get으로 내 email 받아온 후, oldemail에 저장
  //바꾸고 싶은 pw은 newemail에 저장후 patch로 members정보 업데이트 해주기

  return <div>change email</div>;
};

export default ChangeEmailPage;
