import "./MyPage.css";
import AccountPage from "./AccountPage/AccountPage";
import CommunityPage from "./CommunityPage/CommunityPage";
import AboutPage from "./AboutPage/AboutPage";

const MyPage = () => {
  return (
    <div className="p-3">
      <div className="mini-card p-3">
        <strong>내 정보</strong>
        <br />
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
