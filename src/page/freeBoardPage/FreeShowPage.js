import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import FreeCommentWritePage from "./FreeCommentWritePage";
import FreeCommentListPage from "./FreeCommentListPage";
import "./FreeWritePage.css";
import { useSelector } from "react-redux";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";

const FreeShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();

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

  return (
    <div className="p-4">
      <div className="d-flex">
        <h4 className="flex-grow-1">{post.title}</h4>
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
      <br />
      <AiOutlineHeart /> <strong>공감</strong>
      <hr />
      <AiOutlineComment />
      <strong>댓글</strong>
      <br />
      <div className="comment">
        <FreeCommentListPage />
        <FreeCommentWritePage />
      </div>
    </div>
  );
};
export default FreeShowPage;
