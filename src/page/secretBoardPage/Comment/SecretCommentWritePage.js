import { useState, useCallback } from "react";
import "./SecretCommentPage.css";
import { useParams } from "react-router-dom";
import config from "../../../config";
import apiClient from "../../../apiClient";

const SecretCommentWritePage = ({ parentId, refetchComments }) => {
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId");

  const onSubmit = (e) => {
    if (content.trim().length === 0) {
      alert("댓글을 입력하세요");
      return;
    } else {
      setContent("");
      apiClient
        .post(`${config.API_BASE_URL}/secretboard/comment/${id}`, {
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
    setAnonymous(e.target.checked);
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

export default SecretCommentWritePage;
