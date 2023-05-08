import { useState } from "react";
import "./FreeCommentPage.css";
import { useParams } from "react-router-dom";
import apiClient from "../../../apiClient";
import { BiMessage } from "react-icons/bi";

const FreeCommentWritePage = ({ parentId, refetchComments }) => {
  const [content, setContent] = useState("");
  const [anonymous, setIsAnonymous] = useState(false);
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId");

  const onSubmit = (e) => {
    if (content.trim().length === 0) {
      alert("댓글을 입력하세요");
      return;
    } else {
      setContent("");
      apiClient
        .post(`http://localhost:8080/freeboard/comment/${id}`, {
          studentId,
          content,
          anonymous,
        })
        .then(() => {
          refetchComments();
        });
    }
  };

  const onChangeIsAnonymous = (e) => {
    setIsAnonymous(e.target.checked);
  };

  return (
    <div className="comment-wrapper">
      <input
        type="checkbox"
        checked={anonymous}
        onChange={onChangeIsAnonymous}
        className="comment-checkbox"
      />
      <label className="comment-label">익명</label>
      <span className="comment-input-wrapper">
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
        <button className="cursor-pointer button" onClick={onSubmit}>
          작성
        </button>
      </span>
    </div>
  );
};

export default FreeCommentWritePage;
