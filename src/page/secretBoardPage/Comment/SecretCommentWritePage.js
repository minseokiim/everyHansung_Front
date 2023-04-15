import { useEffect, useState, useCallback } from "react";
import "./SecretCommentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SecretCommentWritePage = () => {
  const [commentContent, setCommentContent] = useState("");
  const [commentIsAnonymous, setCommentIsAnonymous] = useState(false);
  const { id } = useParams();
  const move = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentContent.trim().length === 0) {
      alert("댓글을 입력하세요");
      return;
    } else {
      setCommentContent("");
      axios
        .post(`http://localhost:8080/secretposts/${id}/secretcomments`, {
          // studentId,
          commentContent,
          commentCreatedAt: Date.now(),
          commentIsAnonymous,
        })
        .then(move("/secretboard/list"));
    }
  };

  return (
    <div>
      <input type="checkbox" />
      익명
      <input
        className="comment-input"
        type="text"
        placeholder="댓글을 입력하세요"
        value={commentContent}
        onChange={(e) => {
          setCommentContent(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <button className="comment-button" onClick={onSubmit}>
        작성
      </button>
    </div>
  );
};

export default SecretCommentWritePage;
