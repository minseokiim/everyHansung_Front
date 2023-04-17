import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import FreeCommentWritePage from "../Comment/FreeCommentWritePage";
import FreeCommentListPage from "../Comment/FreeCommentListPage";
import FreeBoardHeart from "../Heart/FreeBoardHeart";
import "./FreeWritePage.css";
import { AiOutlineComment, AiOutlineHeart, AiFillEdit } from "react-icons/ai";
import { BiTimeFive, BiMessage } from "react-icons/bi";
import { BsFillPersonFill, BsFillTrashFill } from "react-icons/bs";
import apiClient from "../../../apiClient";
import SendMessagePage from "../../messagePage/SendMessagePage";

const FreeShowPage = () => {
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId");
  const [post, setPost] = useState([]);
  const move = useNavigate();
  const [nickname, setNickname] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const getPost = (id) => {
    axios.get(`http://localhost:8080/freeboard/${id}`).then((res) => {
      setPost(res.data);
    });
  };

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

  useEffect(() => {
    getPost(id);
  }, []);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const deletePost = async (id) => {
    try {
      await apiClient.delete(
        `http://localhost:8080/freeboard/${studentId}/${id}`
      );
      alert("게시물이 삭제되었습니다.");
      move("/freeboard/list");
    } catch (error) {
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex">
        <h4 className="flex-grow-1">
          <strong>{post.title}</strong>
        </h4>
        {post.nickname === nickname && (
          <>
            <div>
              <AiFillEdit
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  move(`/freeboard/edit/${id}`);
                }}
              />
            </div>
            <div>
              <span className="p-2">
                <BsFillTrashFill
                  className="cursor-pointer"
                  onClick={() => {
                    if (window.confirm("게시물을 삭제하시겠습니까?")) {
                      deletePost(id);
                    }
                  }}
                />
              </span>
            </div>
          </>
        )}

        {post.nickname !== nickname && (
          <>
            <div>
              <BiMessage
                className="cursor-pointer"
                onClick={() => {
                  setIsMessageModalOpen(true);
                }}
              />
              <SendMessagePage
                isOpen={isMessageModalOpen}
                onRequestClose={() => setIsMessageModalOpen(false)}
              />
            </div>
          </>
        )}
      </div>
      <div className="text-muted post-time">
        <BiTimeFive /> {printDate(post.createdAt)}
      </div>
      <div className="text-muted post-time">
        <BsFillPersonFill /> {post.isAnonymous ? "익명" : post.nickname}
      </div>
      <hr />
      <p>{post.content}</p>
      <br />
      {/* 좋아요 컴포넌트 */}

      <div className="d-flex">
        <FreeBoardHeart />
        {/* {post.countLike} */}
      </div>

      <hr />
      <AiOutlineComment />
      <strong>댓글</strong>
      <br />
      <div className="comment">
        {/* 댓글 컴포넌트 */}
        <FreeCommentListPage />
        <br />
        <FreeCommentWritePage />
      </div>
    </div>
  );
};
export default FreeShowPage;
