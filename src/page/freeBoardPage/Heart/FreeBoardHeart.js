import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../apiClient";

const FreeBoardHeart = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const studentId = localStorage.getItem("studentId");
  const { id } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 게시물의 좋아요 정보를 조회하는 API 호출
    apiClient
      .get(`http://localhost:8080/heart/${studentId}/${id}`)
      .then((response) => {
        // 좋아요 정보를 받아와 상태 업데이트
        setCountLike(response.data.countLike);
        //console.log("response.data.isFilled : " + response.data.isFilled);
        setIsFilled(response.data.isFilled);
      })
      .catch((error) => {
        console.error("Failed to get like information", error);
      });
  }, []);

  const clickHeart = () => {
    // 좋아요 추가 또는 삭제를 처리하는 API 호출
    if (isFilled) {
      // 이미 좋아요가 되어 있을 경우 삭제 API 호출
      apiClient
        .delete(`http://localhost:8080/heart/${studentId}/${id}`, {
          params: {
            studentId: studentId,
            freeboardId: id,
          },
        })
        .then(() => {
          // 좋아요 삭제가 성공적으로 이루어진 경우 상태 업데이트
          setIsFilled(false);
          setCountLike(countLike - 1);
        })
        .catch((error) => {
          console.error("Failed to delete like", error);
        });
    } else {
      // 좋아요 추가 API 호출
      apiClient
        .post(`http://localhost:8080/heart/${studentId}/${id}`, null, {
          params: {
            studentId: studentId,
            freeboardId: id,
          },
        })
        .then((response) => {
          // 좋아요 추가가 성공적으로 이루어진 경우 상태 업데이트
          setIsFilled(true);
          setCountLike(countLike + 1);
        })
        .catch((error) => {
          console.error("Failed to add like", error);
        });
    }
  };

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
      <span>
        <strong> {countLike}</strong>
      </span>
    </div>
  );
};

export default FreeBoardHeart;
