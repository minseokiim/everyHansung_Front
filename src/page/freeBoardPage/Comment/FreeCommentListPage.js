import { useEffect, useState, useCallback } from "react";
import "./FreeCommentPage.css";
import { useParams } from "react-router-dom";
import apiClient from "../../../apiClient";
import { BsFillTrashFill } from "react-icons/bs";
import FreeCommentWritePage from "./FreeCommentWritePage";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import FreeReplyCommentPage from "./FreeReplyCommentPage";

const FreeCommentListPage = () => {
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  const [showReplyForm, setShowReplyForm] = useState(null);
  const studentId = localStorage.getItem("studentId");

  //여기서 id는 게시물 아이디이므로 못받아옴
  const getComments = () => {
    //해당 게시물의 댓글 받아오기 ->오류 나는 이유:id가 겹침
    apiClient
      .get(`http://localhost:8080/freeboard/comment/${id}`)
      .then((res) => {
        setComment(res.data);
      });
  };

  //여기서 get해올때 undefined
  const getReplies = (parentId) => {
    apiClient
      .get(`http://localhost:8080/freeboard/comment/${parentId}/replies`)
      .then((res) => {
        const updatedComments = comment.map((c) => {
          if (c.id === parentId) {
            return { ...c, replies: res.data };
          } else {
            return c;
          }
        });
        setComment(updatedComments);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const refetchComments = useCallback(() => {
    //getComments();
    getReplies();
  }, []);

  const deleteComment = (e, id, commentId) => {
    e.stopPropagation();
    apiClient
      .delete(`http://localhost:8080/freeboard/comment/${id}/${commentId}`)
      .then(() => {
        getComments();
      });
  };

  const toggleReplyForm = (commentId) => {
    setShowReplyForm((prev) => (prev === commentId ? null : commentId));
    getReplies(commentId);
  };

  return (
    <div>
      <div>
        <AiOutlineComment />
        <span className="p-1">
          <strong>댓글 </strong>
        </span>

        <div className="p-1">
          {comment.length > 0 ? (
            comment
              .filter((comment) => comment.content !== 0)
              .map((comment) => {
                return (
                  <div key={comment.id}>
                    <div className="d-flex">
                      <div className="comment-box flex-grow-1">
                        {comment.isAnonymous ? "익명" : comment.nickname}:
                        <span className="p-1">{comment.content}</span>
                        <div className="comment-time ">
                          {printDate(comment.createdAt)}
                        </div>
                      </div>
                      <div>
                        {/* 대댓글 다는 기능으로 바꾸기 */}
                        <FaRegCommentDots
                          className="cursor-pointer icon  grey"
                          onClick={() => toggleReplyForm(comment.id)}
                        />

                        {studentId === comment.studentId && (
                          <>
                            <span className="p-2">
                              <BsFillTrashFill
                                className="cursor-pointer icon grey"
                                onClick={(e) => {
                                  {
                                    if (
                                      window.confirm(
                                        "게시물을 삭제하시겠습니까?"
                                      )
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
                    <hr />
                    {/* 대댓글 창 */}
                    {showReplyForm === comment.id && (
                      <div className="reply-form">
                        <FreeReplyCommentPage
                          parentId={comment.id}
                          postReply={refetchComments()}
                        />
                      </div>
                    )}
                    {/* 대댓글 추가되면 보이는 대댓글 리스트 ->현재 안됨*/}
                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <div key={reply.id} className="nested-reply">
                          <div className="d-flex">
                            <div className="comment-box flex-grow-1">
                              {reply.isAnonymous ? "익명" : reply.nickname}:
                              <span className="p-1">{reply.content}</span>
                              <div className="comment-time ">
                                {printDate(reply.createdAt)}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                  </div>
                );
              })
          ) : (
            <div className="no-comment">
              해당 게시물에는 댓글이 없습니다
              <br /> <br />
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      {/* 일반 댓글창 */}
      <FreeCommentWritePage refetchComments={refetchComments} />
    </div>
  );
};

export default FreeCommentListPage;
