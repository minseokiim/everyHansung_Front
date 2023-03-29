import "./MyPage.css";

const AccountPage = () => {
  return (
    <div>
      <div className="mini-card p-3">
        <strong>계정</strong>
        <br /> <br />
        <div className="cursor-pointer">학교 인증</div>
        <br />
        <div className="cursor-pointer">비밀번호 변경</div>
        <br />
        <div className="cursor-pointer">이메일 변경</div>
      </div>
    </div>
  );
};

export default AccountPage;
