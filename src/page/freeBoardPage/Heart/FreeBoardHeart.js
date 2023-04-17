import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../../apiClient";

const FreeBoardHeart = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const studentId = localStorage.getItem("studentId");
  const { id } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get(`http://localhost:8080/heart/${studentId}/${id}`);
      if (response.data) {
        setIsFilled(true);
      }
    };
    fetchData();
  }, []);

  const clickHeart = async () => {
    try {
      console.log("freeboardId = " + id + " & " + "studentId = " + studentId);
      const response = await apiClient.post(`http://localhost:8080/heart`, null, {
        params: {
          studentId: studentId,
          freeboardId: id
        }
      });
      setIsFilled(true);
      if (response.status === 201) {
        setMessage('좋아요가 추가되었습니다.');
      } else {
        setMessage('좋아요 추가에 실패했습니다.');
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(`Error: ${error.response.data}`);
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };


  // const clickHeart = () => {
  //   if (!isFilled) {
  //     setIsFilled(true);
  //     setCountLike(countLike + 1);

  //     //좋아요 수 patch
  //     apiClient.post(`http://localhost:8080/hearts`, null, {
  //       params: {
  //           memberId: studentId,
  //           freeboardId: id
  //       }
  //   })
  //   .then(response => {
  //       // 요청이 성공한 경우 처리
  //   })
  //   .catch(error => {
  //       if (error.response.status === 400) {
  //           // 400 오류 발생 시 처리
  //           console.log("Error:", error.response.data);
  //       } else {
  //           // 다른 오류 발생 시 처리
  //           console.log("Error:", error.message);
  //       }
  //   });
  //   } else {
  //     setIsFilled(false);
  //     setCountLike(countLike - 1);
  //   }
  // };

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
