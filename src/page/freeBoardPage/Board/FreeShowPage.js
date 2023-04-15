import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import FreeCommentWritePage from "../Comment/FreeCommentWritePage";
import FreeCommentListPage from "../Comment/FreeCommentListPage";
import "./FreeWritePage.css";
import { useSelector } from "react-redux";
import { AiOutlineComment, AiOutlineHeart, AiFillEdit } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

const FreeShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();

  const getPost = (id) => {
    axios.get(`http://localhost:8080/freeboard/${id}`).then((res) => {
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
          <AiFillEdit
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              move(`/freeboard/edit/${id}`);
            }}
          />
        </div>
      </div>
      <div className="text-muted post-time">
        <BiTimeFive /> {printDate(post.createdAt)}
      </div>
      <div className="text-muted post-time">
        <BsFillPersonFill /> {post.isAnonymous ? "익명" : post.studentId}
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
        <br />
        <FreeCommentWritePage />
      </div>
    </div>
  );
};
export default FreeShowPage;
