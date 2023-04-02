import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import FreeCommentWritePage from "./FreeCommentWritePage";
import FreeCommentListPage from "./FreeCommentListPage";
import "./FreeWritePage.css";
import { useSelector } from "react-redux";

const FreeShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();
  const studentId = useSelector((state) => state.auth.studentId);

  const getPost = (id) => {
    axios.get(`http://localhost:8080/freeposts/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  useEffect(() => {
    getPost(id);
  }, []);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  console.log("Student ID: ", studentId); //현재 로그인한 아이디 확인

  return (
    <div className="p-3">
      <div className="d-flex">
        <h2 className="flex-grow-1">{post.title}</h2>
        <div>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              move(`/freeboard/edit/${id}`);
            }}
          >
            수정하기
          </button>
        </div>
      </div>
      <div className="text-muted post-time">
        작성일: {printDate(post.createdAt)}
      </div>
      <hr />
      <p>{post.content}</p>
      <hr /> <strong>댓글</strong>
      <br />
      <br />
      <FreeCommentListPage />
      <FreeCommentWritePage />
    </div>
  );
};
export default FreeShowPage;
