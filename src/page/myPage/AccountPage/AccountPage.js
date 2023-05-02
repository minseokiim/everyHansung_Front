import "../MyPage.css";
import { useNavigate } from "react-router-dom";
import { AiFillSafetyCertificate } from "react-icons/ai";

const AccountPage = () => {
  const move = useNavigate();

  return (
    <div>
      <div className="mini-card p-3">
        <AiFillSafetyCertificate />
        <strong className="p-1"> 계정</strong>
        <br /> <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/my/auth");
          }}
        >
          학교 인증
        </div>
        <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/my/email");
          }}
        >
          이메일 변경
        </div>
        <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/my/nickname");
          }}
        >
          닉네임 변경
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
