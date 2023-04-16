import { useEffect, useState } from "react";
import "./FreeWritePage.css";
import { useNavigate, useParams } from "react-router-dom";
import propTypes from "prop-types";
import apiClient from "../../../apiClient";
import axios from "axios";

const FreeWritePage = ({ editing }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const studentId = localStorage.getItem("studentId");
  const [nickname, setNickname] = useState("");

  const move = useNavigate();
  const { id } = useParams();

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
    if (editing) {
      axios.get(`http://localhost:8080/freeboard/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setIsAnonymous(res.data.isAnonymous);
      });
    }
  }, [id, editing]);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(nickname);

    if (title.trim().length === 0) {
      alert("제목을 입력하세요");
      return;
    } else if (content.trim().length === 0) {
      alert("본문을 입력하세요");
      return;
    } else if (editing) {
      apiClient
        .patch(`http://localhost:8080/freeboard/${id}`, {
          //studentId, 학번 patch할 필요 없음
          title,
          content,
          isAnonymous,
        })
        .then(() => {
          move(`/freeboard/${id}`);
        });
    } else {
      apiClient
        .post("http://localhost:8080/freeboard", {
          studentId,
          title,
          content,
          isAnonymous,
          nickname,
        })
        .then(() => {
          // console.log("isAnonymous" + isAnonymous);
          move("/freeboard/list");
        });
    }
  };

  const onChangeIsAnonymous = (e) => {
    setIsAnonymous(e.target.checked);
    // console.log("isAnonymous: " + e.target.checked); // 확인 코드
  };

  return (
    <form className="back">
      <div className="mb-3">
        <label className="form-label m-2 mb-0">
          <strong>{editing ? "자유 글 수정하기" : "자유 글 쓰기"}</strong>
        </label>
        <hr />

        <input
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="제목을 입력해주세요."
        ></input>
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          rows="15"
          placeholder="본문을 입력해주세요."
        ></textarea>
      </div>
      <div className="mb-3">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={onChangeIsAnonymous}
        />
        익명
        <div className="mb-3">
          <button
            className="button "
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              move("/freeboard/list");
            }}
          >
            취소
          </button>
          &nbsp;
          <button className="button" type="submit" onClick={onSubmit}>
            {editing ? "수정" : "게시"}
          </button>
        </div>
      </div>
    </form>
  );
};

FreeWritePage.propTypes = {
  editing: propTypes.bool,
};
FreeWritePage.defaultProps = {
  editing: false,
};

export default FreeWritePage;
