import { useEffect, useState, useCallback } from "react";
import "./FreeCommentPage.css";
import { useParams } from "react-router-dom";
import apiClient from "../../../apiClient";
import { BsFillTrashFill } from "react-icons/bs";
import FreeCommentWritePage from "./FreeCommentWritePage";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";

const FreeCommentListPage = () => {
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  const [showReplyForm, setShowReplyForm] = useState(null);
  const studentId = localStorage.getItem("studentId"); //학번 정보 받아오기

  const getComments = () => {
    //해당 게시물의 댓글 받아오기
    apiClient
      .get(`http://localhost:8080/freeboard/comment/${id}`)
      .then((res) => {
        console.log(res.data);
        setComment(res.data);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  const deleteComment = (e, boardId, id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      e.stopPropagation();

    // apiClient.delete() 하기
    apiClient
      .delete(
        `http://localhost:8080/freeboard/comment/${commentId}/${comment.id}`
      )
      .then((res) => {
        setComment(res.data);
      });
  };

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const refetchComments = useCallback(() => {
    getComments();
  }, []);

  return (
    <>
      <div>
        <strong>
          <AiOutlineComment />
          댓글
        </strong>
        <div className="p-2">
          {comment.length > 0 ? (
            comment
              .filter((comment) => comment.content !== 0)
              .map((comment) => {
                return (
                  <div className="d-flex" key={comment.id}>
                    <div className="comment-box flex-grow-1">
                      {comment.isAnonymous ? "익명" : comment.nickname} :
                      <span className="p-1">{comment.content}</span>
                      <div className="comment-time ">
                        {printDate(comment.createdAt)}
                      </div>
                    </div>
                    <div>
                      {/* 대댓글 다는 기능으로 바꾸기 */}
                      <FaRegCommentDots
                        className="cursor-pointer icon"
                        // onClick={() =>
                        //   setShowReplyForm(
                        //     showReplyForm === comment.id ? null : comment.id
                        //   )
                        // }
                      />

                      {studentId === comment.studentId && (
                        <>
                          <span className="p-2">
                            <BsFillTrashFill
                              className="cursor-pointer icon"
                              onClick={(e) => deleteComment(e, comment.boardId)}
                            />
                          </span>
                        </>
                      )}
                    </div>
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
      <FreeCommentWritePage refetchComments={refetchComments} />
    </>
  );
};

export default FreeCommentListPage;
