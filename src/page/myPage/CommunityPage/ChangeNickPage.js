import axios from "axios";
import { useState } from "react";

const ChangeNickPage = () => {
  const [oldnick, setOldnick] = useState("");
  const [newnick, setNewnick] = useState("");

  //axios.get으로 내 닉네임 받아온 후, oldnick에 저장
  //바꾸고 싶은 닉네임은 newnick에 저장후 patch로 members정보 업데이트 해주기

  return <div>change nick</div>;
};

export default ChangeNickPage;
