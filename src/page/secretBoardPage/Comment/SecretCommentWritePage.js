import { useEffect, useState, useCallback } from "react";
import "./SecretCommentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../../apiClient";

const SecretCommentWritePage = () => {
  const [commentContent, setCommentContent] = useState("");
  const [commentIsAnonymous, setCommentIsAnonymous] = useState(false);
  const { id } = useParams();
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}`)
        .then((res) => {
          const member = res.data;
          setNickname(member.nickname);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    } else {
      console.log("닉네임 못받아옴");
    }
  }, [studentId]);

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
          nickname,
        })
        .then(move("/secretboard/list"));
    }
  };

  const onChangeIsAnonymous = (e) => {
    setCommentIsAnonymous(e.target.checked);
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
      <input
        type="checkbox"
        checked={commentIsAnonymous}
        onChange={onChangeIsAnonymous}
      />
      익명
      <button className="comment-button" onClick={onSubmit}>
        작성
      </button>
    </div>
  );
};

export default SecretCommentWritePage;
