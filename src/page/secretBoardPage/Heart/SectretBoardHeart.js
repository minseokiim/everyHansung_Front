import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../../apiClient";

const SecretBoardHeart = () => {
  const [isFilled, setIsFilled] = useState(false);
  const studentId = localStorage.getItem("studentId");
  //이 페이지는 개인마다 보이는 페이지이므로 하트는 각각 한번씩만 보여야함
  const { id } = useParams();

  //게시물 정보 먼저 받아오기 (게시물id)
  const getHearts = () => {
    axios.get(`http://localhost:8080/secretposts/${id}/heart`);
  };

  //정보 보내는 함수
  const clickHeart = () => {
    if (!isFilled) {
      setIsFilled(true);

      //filled랑 studentId랑 post.id 전송해주기
      axios.post(`http://localhost:8080/secretposts/${id}/heart`, {
        isFilled,
        studentId,
      });
    } else {
      setIsFilled(false);
      //이미 하트 눌린 경우
      //
      //   axios.patch(`http://localhost:8080/secretposts/${id}/heart`, {
      //     isFilled, // 하트 수를 패치
      //     studentId,
      //   });
    }
  };

  useEffect(() => {
    getHearts();
  }, [isFilled]);

  return (
    <div>
      {isFilled ? (
        <AiFillHeart
          className="cursor-pointer"
          onClick={clickHeart}
          style={{ color: "#c62917" }}
        />
      ) : (
        <AiOutlineHeart className="cursor-pointer" onClick={clickHeart} />
      )}
    </div>
  );
};

export default SecretBoardHeart;
