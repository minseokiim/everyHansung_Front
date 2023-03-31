import "./MyPage.css";
import AccountPage from "./AccountPage/AccountPage";
import CommunityPage from "./CommunityPage/CommunityPage";
import AboutPage from "./AboutPage/AboutPage";
import axios from "axios";

const MyPage = () => {
  //axios.get으로 이름이랑 닉네임 , 학번 받아오기

  return (
    <div className="p-3">
      <div className="mini-card p-3">
        <strong>내 정보 </strong>
        <br />
        <div className="grey">
          <img alt="hansung" src="img/chatlogo.png" className="logo" />
          이름 / 학번 / 닉네임
        </div>
      </div>
      <br />
      <AccountPage />
      <br />
      <CommunityPage />
      <br />
      <AboutPage />
    </div>
  );
};

export default MyPage;
