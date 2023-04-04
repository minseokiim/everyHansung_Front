import "../MyPage.css";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const move = useNavigate();

  return (
    <div>
      <div className="mini-card p-3">
        <strong>이용안내</strong> <br />
        <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/page/rules");
          }}
        >
          커뮤니티 이용 규칙
        </div>
        <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/page/serviceagreement");
          }}
        >
          서비스 이용 약관
        </div>
        <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/page/privacy");
          }}
        >
          개인정보 처리방침
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
