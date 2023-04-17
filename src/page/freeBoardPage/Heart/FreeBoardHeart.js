import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../../apiClient";

const FreeBoardHeart = () => {
  const [isFilled, setIsFilled] = useState(false);
  const studentId = localStorage.getItem("studentId");
  const { id } = useParams();

  // const clickEmptyHeart = () => {
  //   setIsFilled(true);

  //   apiClient
  //     .post(`http://localhost:8080/heart`, null, {
  //       params: {
  //         studentId: studentId,
  //         freeboardId: id,
  //       },
  //     })
  //     .then(() => {
  //       console.log("post성공");
  //     });
  // };

  // const clickFillHeart = () => {
  //   setIsFilled(false);

  //   apiClient
  //     .delete(`http://localhost:8080/heart/${studentId}/${id}`)
  //     .then(() => {
  //       console.log("delete성공");
  //     });
  // };

  useEffect(() => {
    const fetchData = async () => {
      // 게시물의 좋아요 정보를 조회
      const response = await apiClient.get(
        `http://localhost:8080/heart/${studentId}/${id}`
      );
      if (response.data) {
        // 좋아요 정보를 받아와 상태 업데이트
        setIsFilled(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isFilled ? (
        <AiFillHeart
          className="cursor-pointer"
          onClick={clickFillHeart}
          style={{ color: "#c62917" }}
        />
      ) : (
        <AiOutlineHeart className="cursor-pointer" onClick={clickEmptyHeart} />
      )}
    </div>
  );
};

export default FreeBoardHeart;
