import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SecretCommentListPage from "./SecretCommentListPage";
import SecretCommentWritePage from "./SecretCommentWritePage";
import "../freeBoardPage/FreeWritePage.css";

const SecretShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();

  const getPost = (id) => {
    axios.get(`http://localhost:8080/secretposts/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  useEffect(() => {
    getPost(id);
  }, []);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-3">
      <div className="d-flex">
        <h2 className="flex-grow-1">{post.title}</h2>
        <div>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              move(`/secretboard/edit/${id}`);
            }}
          >
            수정하기
          </button>
        </div>
      </div>
      <div className="text-muted post-time">
        작성일: {printDate(post.createdAt)}
      </div>
      <br />
      <hr />
      <p>{post.content}</p>
      <hr /> <strong>댓글</strong>
      <br />
      <br />
      <SecretCommentListPage />
      <SecretCommentWritePage />
    </div>
  );
};
export default SecretShowPage;
