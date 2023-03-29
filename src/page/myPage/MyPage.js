import "./MyPage.css";
import AccountPage from "./AccountPage";
import CommunityPage from "./CommunityPage";
import AboutPage from "./AboutPage";

const MyPage = () => {
  return (
    <div className="p-3">
      <div className="mini-card p-3">
        <strong>내 정보</strong> <br />
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
