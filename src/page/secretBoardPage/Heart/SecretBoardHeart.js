import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../apiClient";

const SecretBoardHeart = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const studentId = localStorage.getItem("studentId");
  const { id } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiClient
      .get(`http://localhost:8080/secret/heart/${studentId}/${id}`)
      .then((response) => {
        setCountLike(response.data.countLike);
        setIsFilled(response.data.isFilled);
      })
      .catch((error) => {
        console.error("Failed to get like information", error);
      });
  }, []);

  const clickHeart = () => {
    if (isFilled) {
      apiClient
        .delete(`http://localhost:8080/secret/heart/${studentId}/${id}`, {
          params: {
            studentId: studentId,
            secretboardId: id,
          },
        })
        .then(() => {
          setIsFilled(false);
          setCountLike(countLike - 1);
        })
        .catch((error) => {
          console.error("Failed to delete like", error);
        });
    } else {
      apiClient
        .post(`http://localhost:8080/secret/heart/${studentId}/${id}`, null, {
          params: {
            studentId: studentId,
            secretboardId: id,
          },
        })
        .then((response) => {
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
      <strong className="p-1">좋아요</strong>
      <span>
        <strong> {countLike}</strong>
      </span>
    </div>
  );
};

export default SecretBoardHeart;
