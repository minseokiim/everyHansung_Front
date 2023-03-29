import "./MyPage.css";

const AboutPage = () => {
  return (
    <div>
      <div className="mini-card p-3">
        <strong>이용안내</strong> <br />
        <br />
        <div className="cursor-pointer">서비스 이용 약관</div>
        <br />
        <div className="cursor-pointer">공지사항</div>
      </div>
    </div>
  );
};

export default AboutPage;
