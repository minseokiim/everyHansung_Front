import { useEffect, useState, useCallback } from "react";
import "./FreeCommentPage.css";
import { useParams } from "react-router-dom";
import apiClient from "../../../apiClient";
import FreeCommentWritePage from "./FreeCommentWritePage";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import FreeReplyCommentPage from "./FreeReplyCommentPage";
import { GrFormNext } from "react-icons/gr";
import { BsFillPersonFill, BsFillTrashFill } from "react-icons/bs";
import config from "../../../config";

const FreeCommentListPage = () => {
  const [comment, setComment] = useState([]);
  const [replies, setReplies] = useState({});
  const { id } = useParams();
  const [showReplyForm, setShowReplyForm] = useState(null);
  const studentId = localStorage.getItem("studentId");
  const isAdmin = studentId === "admin";

  const getComments = () => {
    apiClient
      .get(`${config.API_BASE_URL}/freeboard/comment/${id}`)
      .then((res) => {
        setComment(res.data);
        res.data.forEach((comment) => {
          getReplies(comment.id);
        });
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  const getReplies = (parentId) => {
    apiClient
      .get(`${config.API_BASE_URL}/freeboard/comment/${parentId}/replies`)
      .then((res) => {
        setReplies((prevReplies) => ({
          ...prevReplies,
          [parentId]: res.data,
        }));
      });
  };

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const refetchComments = useCallback(() => {
    getComments();
  }, []);

  const refetchReplies = (parentId) => {
    getReplies(parentId);
  };

  const deleteComment = (e, id, commentId) => {
    e.stopPropagation();
    apiClient
      .delete(`${config.API_BASE_URL}/freeboard/comment/${id}/${commentId}`)
      .then(() => {
        getComments();
      });
  };

  const deleteReply = (e, parentId, replyId) => {
    e.stopPropagation();
    apiClient
      .delete(
        `${config.API_BASE_URL}/freeboard/comment/${id}/${replyId}/replies`
      )
      .then(() => {
        refetchReplies(parentId);
      });
  };

  const toggleReplyForm = (commentId) => {
    setShowReplyForm((prev) => (prev === commentId ? null : commentId));
    getReplies(commentId);
  };

  return (
    <div className="free-comment-list-container">
      <div>
        <AiOutlineComment /> <strong>댓글 </strong>
        <div className="p-1">
          {comment.length > 0 ? (
            comment
              .filter((comment) => comment.content !== 0)
              .filter((comment) => comment.parentId === 0)
              .map((comment) => {
                return (
                  <div key={comment.id}>
                    <div className="d-flex">
                      <div className="comment-box flex-grow-1 p-1">
                        <BsFillPersonFill />
                        {comment.anonymous ? "익명" : comment.nickname}:
                        <span className="p-1">{comment.content}</span>
                        <div className="comment-time ">
                          {printDate(comment.createdAt)}
                        </div>
                      </div>
                      <div>
                        <FaRegCommentDots
                          className="cursor-pointer icon  grey"
                          onClick={() => toggleReplyForm(comment.id)}
                        />

                        {(isAdmin || studentId === comment.studentId) && (
                          <>
                            <span className="p-2">
                              <BsFillTrashFill
                                className="cursor-pointer icon grey"
                                onClick={(e) => {
                                  {
                                    if (
                                      window.confirm("댓글을 삭제하시겠습니까?")
                                    ) {
                                      deleteComment(e, id, comment.id);
                                    }
                                  }
                                }}
                              />
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="reply-comment">
                      <div className="reply-box">
                        {replies[comment.id] &&
                          replies[comment.id].map((reply) => (
                            <div key={reply.id}>
                              <div className="d-flex">
                                <div className="comment-box flex-grow-1 p-1">
                                  <div className="reply-box">
                                    &nbsp;&nbsp; <GrFormNext />
                                    {reply.anonymous ? "익명" : reply.nickname}:
                                    <span className="p-1">{reply.content}</span>
                                    <div className="comment-time ">
                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                      {printDate(reply.createdAt)}
                                    </div>
                                  </div>
                                </div>

                                {(isAdmin ||
                                  studentId === comment.studentId) && (
                                  <div>
                                    <span className="p-2">
                                      <BsFillTrashFill
                                        className="cursor-pointer icon grey"
                                        onClick={(e) => {
                                          {
                                            if (
                                              window.confirm(
                                                "댓글을 삭제하시겠습니까?"
                                              )
                                            ) {
                                              deleteReply(
                                                e,
                                                comment.id,
                                                reply.id
                                              );
                                            }
                                          }
                                        }}
                                      />
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {showReplyForm === comment.id && (
                      <FreeReplyCommentPage
                        parentId={comment.id}
                        refetchReplies={() => refetchReplies(comment.id)}
                        boardId={id}
                      />
                    )}
                  </div>
                );
              })
          ) : (
            <div className="no-comment">
              해당 게시물에는 댓글이 없습니다.
              <br /> <br />
            </div>
          )}
        </div>
      </div>
      <FreeCommentWritePage refetchComments={refetchComments} />
    </div>
  );
};

export default FreeCommentListPage;
