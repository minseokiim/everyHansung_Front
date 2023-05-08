import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FreeCommentListPage from "../Comment/FreeCommentListPage";
import FreeBoardHeart from "../Heart/FreeBoardHeart";
import "./FreeWritePage.css";
import { AiFillEdit } from "react-icons/ai";
import { BiTimeFive, BiMessage } from "react-icons/bi";
import { BsFillPersonFill, BsFillTrashFill } from "react-icons/bs";
import apiClient from "../../../apiClient";
import SendMessagePage from "../../messagePage/SendMessagePage";
import "../Comment/FreeCommentPage.css";
import axios from "axios";

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
          console.error("Error:", error);
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
      move("/freeboard");
    } catch (error) {
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="p-4">
      {nickname && (
        <>
          <div className="d-flex">
            <h4 className="flex-grow-1">
              <strong>{post.title}</strong>
            </h4>
            {post.nickname === nickname && (
              <>
                <div>
                  <AiFillEdit
                    className="cursor-pointer icon"
                    onClick={(e) => {
                      e.preventDefault();
                      move(`/freeboard/edit/${id}`);
                    }}
                  />
                </div>
                <div>
                  <span className="p-2">
                    <BsFillTrashFill
                      className="cursor-pointer icon"
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
          <div className=" mt-1">
            {post.createdAt === post.updatedAt && (
              <div className="text-muted post-time ">
                <BiTimeFive /> 작성 : {printDate(post.createdAt)}
              </div>
            )}
            {post.createdAt !== post.updatedAt && (
              <div className="text-muted post-time ">
                <AiFillEdit /> 수정 : {printDate(post.updatedAt)}
              </div>
            )}
          </div>
          <div className="post-time pt-2">
            <BsFillPersonFill /> {post.anonymous ? "익명" : post.nickname}
          </div>
          <hr />
          <div className="big-grey p-2">
            {post.content}
            {/* 사진 보여주기 */}
            <br />
            {post.imageFile && (
              <div className="mt-3">
                <img
                  src={`data:image/png;base64,${post.imageFile}`}
                  alt="preview"
                  style={{ width: "400px", height: "auto" }}
                />
              </div>
            )}
          </div>
          <br />

          <div className="d-flex">
            <FreeBoardHeart />
          </div>
          <hr />

          <div className="comment">
            <FreeCommentListPage />
            <br />
          </div>
        </>
      )}
    </div>
  );
};
export default FreeShowPage;
