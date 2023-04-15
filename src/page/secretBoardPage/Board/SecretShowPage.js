import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SecretCommentListPage from "../Comment/SecretCommentListPage";
import SecretCommentWritePage from "../Comment/SecretCommentWritePage";
import "../../freeBoardPage/Comment/FreeCommentPage.css";
import { AiOutlineComment, AiOutlineHeart, AiFillEdit } from "react-icons/ai";
import apiClient from "../../../apiClient";
import { BiTimeFive } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

const SecretShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  // const [postNick, setPostNick] = useState("");
  const move = useNavigate();

  const getPost = (id) => {
    axios.get(`http://localhost:8080/secretposts/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  const getComments = (id) => {
    axios
      .get(`http://localhost:8080/secretposts/${id}/secretcomments`)
      .then((res) => setComments(res.data));
  };

  useEffect(() => {
    getPost(id);
    getComments();
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
              move(`/secretboard/edit/${id}`);
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
        <SecretCommentListPage />
        <br />
        <SecretCommentWritePage />
      </div>
    </div>
  );
};
export default SecretShowPage;
