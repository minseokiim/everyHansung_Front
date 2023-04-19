import { useEffect, useState, useCallback } from "react";
import "./FreeCommentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../../apiClient";
import { BiMessage } from "react-icons/bi";

const FreeCommentWritePage = ({ refetchComments }) => {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId");

  const onSubmit = (e) => {
    e.preventDefault();

    if (content.trim().length === 0) {
      alert("댓글을 입력하세요");
      return;
    } else {
      setContent("");
      apiClient
        .post(`http://localhost:8080/comment/${id}`, {
          studentId,
          content,
          isAnonymous,
          // commentCreatedAt: Date.now(),
        })
        .then(() => {
          refetchComments();
        });
    }
  };

  const onChangeIsAnonymous = (e) => {
    console.log("값 말해봐 : " + e.target.checked);
    setIsAnonymous(e.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isAnonymous}
        onChange={onChangeIsAnonymous}
      />
      익명
      <span>
        <input
          className="comment-input"
          type="text"
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
        />
        <BiMessage className="cursor-pointer comment-icon" onClick={onSubmit}>
          작성
        </BiMessage>
      </span>
    </div>
  );
};

export default FreeCommentWritePage;
