import { useEffect, useState, useCallback } from "react";
import "./FreeCommentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FreeCommentWritePage = () => {
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
        .post(`http://localhost:8080/freeposts/${id}/freecomments`, {
          commentContent,
          commentCreatedAt: Date.now(),
          commentIsAnonymous,
        })
        .then(move(`/freeboard/list`));
    }
  };

  return (
    <div>
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
      <input type="checkbox" />
      익명
      <button className="comment-button" onClick={onSubmit}>
        작성
      </button>
    </div>
  );
};

export default FreeCommentWritePage;
