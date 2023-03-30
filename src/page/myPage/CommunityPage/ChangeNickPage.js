import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ChangeNickPage = () => {
  const { id } = useParams();
  const [newnick, setNewnick] = useState("");

  axios
    .patch(`http://localhost:8080/members/${id}`, {
      nickname: newnick,
    })
    .then(() => {
      // move(`/freeboard/${id}`);
    });

  //axios.get으로 내 닉네임 받아온 후
  //바꾸고 싶은 닉네임은 newnick에 저장후 patch로 members정보 업데이트 해주기

  return <div>change nick</div>;
};

export default ChangeNickPage;
