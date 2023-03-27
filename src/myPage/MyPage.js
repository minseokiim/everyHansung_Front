import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="p-3">
      <h4>내정보</h4> <br />
      <div className="mini-card">
        <h5>계정</h5> <hr />
        <div>학교 인증</div>
        <div>비밀번호 변경</div>
        <div>이메일 변경</div>
      </div>
      <br />
      <div className="mini-card">
        <h5>커뮤니티</h5> <hr />
        <div>닉네임 설정</div>
        <div>이용 제한 내역</div>
        <div>커뮤니티 이용 규칙</div>
      </div>
      <br />
      <div className="mini-card">
        <h5>이용안내</h5>
        <hr />
        <div>서비스 이용 약관</div>
        <div>공지사항</div>
      </div>
    </div>
  );
};

export default MyPage;
