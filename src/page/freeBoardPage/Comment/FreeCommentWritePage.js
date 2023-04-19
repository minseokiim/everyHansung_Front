import { useEffect, useState, useCallback } from "react";
import "./FreeCommentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../../apiClient";

const FreeCommentWritePage = () => {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { id } = useParams();
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [nickname, setNickname] = useState("");

  //댓글 작성 위해 닉네임 받아오기
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

    if (content.trim().length === 0) {
      alert("댓글을 입력하세요");
      return;
    } else {
      setContent("");
      apiClient
        .post(`http://localhost:8080/comment/${id}`, {
          studentId,
          content,
          isAnonymous
          // content,
          // commentCreatedAt: Date.now(),
          // isAnonymous,
          // nickname,
        })
        // .then(move(`/freeboard/list`));
    }
  };

  const onChangeIsAnonymous = (e) => {
    console.log("값 말해봐 : " + e.target.checked);
    setIsAnonymous(e.target.checked);
  };

  return (
    <div>
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
      <input
        type="checkbox"
        checked={isAnonymous}
        onChange={onChangeIsAnonymous}
      />
      익명
      <button className="comment-button" onClick={onSubmit}>
        작성
      </button>
    </div>
  );
};

export default FreeCommentWritePage;
