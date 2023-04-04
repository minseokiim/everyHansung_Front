import "../MyPage.css";
import { useNavigate } from "react-router-dom";

const OtherPage = () => {
  const move = useNavigate();

  return (
    <div>
      <div className="mini-card p-3">
        <strong>기타</strong>
        <br /> <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/my/deleteaccount");
          }}
        >
          회원탈퇴
        </div>
      </div>
    </div>
  );
};

export default OtherPage;
