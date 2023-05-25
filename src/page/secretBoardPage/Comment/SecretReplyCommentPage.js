import "./SecretCommentPage.css";
import { useParams } from "react-router-dom";
import apiClient from "../../../apiClient";
import { useState } from "react";
import config from "../../../config";

const SecretReplyCommentPage = ({ parentId, refetchReplies, boardId }) => {
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const studentId = localStorage.getItem("studentId");

  const onSubmit = () => {
    if (content.trim().length === 0) {
      alert("댓글을 입력하세요");
      return;
    } else {
      setContent("");
      apiClient
        .post(
          `${config.API_BASE_URL}/secretboard/comment/${parentId}/replies`,
          {
            studentId,
            content,
            anonymous,
            boardId,
          }
        )
        .then(() => {
          refetchReplies();
        });
    }
  };

  const onChangeIsAnonymous = (e) => {
    setIsAnonymous(e.target.checked);
  };

  return (
    <>
      <div className="comment-wrapper p-2">
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
            placeholder="대댓글을 입력하세요."
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
      <br />
    </>
  );
};

export default SecretReplyCommentPage;
