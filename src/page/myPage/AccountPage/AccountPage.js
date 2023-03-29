import "../MyPage.css";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const move = useNavigate();

  return (
    <div>
      <div className="mini-card p-3">
        <strong>계정</strong>
        <br /> <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/");
          }}
        >
          학교 인증
        </div>
        <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/mypage/changepw");
          }}
        >
          비밀번호 변경
        </div>
        <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/mypage/changeemail");
          }}
        >
          이메일 변경
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
