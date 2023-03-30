import "../MyPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const move = useNavigate();

  return (
    <div className="">
      <div className="mini-card p-3">
        <strong>커뮤니티</strong>
        <br />
        <br />
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/my/nickname");
          }}
        >
          닉네임 설정
        </div>
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
      </div>
    </div>
  );
};

export default CommunityPage;
