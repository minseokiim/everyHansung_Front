import { useEffect, useState } from "react";
import "./SecretWritePage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import propTypes from "prop-types";
import apiClient from "../../../apiClient";

const SecretWritePage = ({ editing }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const studentId = localStorage.getItem("studentId");

  const move = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editing) {
      apiClient.get(`http://localhost:8080/secretboard/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setIsAnonymous(res.data.isAnonymous);
      });
    }
  }, [id, editing]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      alert("제목을 입력하세요");
      return;
    } else if (content.trim().length === 0) {
      alert("본문을 입력하세요");
      return;
    } else if (editing) {
      apiClient
        .patch(`http://localhost:8080/secretboard/${id}`, {
          studentId,
          title,
          content,
          isAnonymous,
        })
        .then((res) => {
          move(`/secretboard/${id}`);
        });
    } else {
      apiClient
        .post("http://localhost:8080/secretboard", {
          studentId,
          title,
          content,
          createdAt: Date.now(),
          isAnonymous,
        })
        .then(() => {
          alert("작성되었습니다!");
          move("/secretboard/list");
        });
    }
  };

  const onChangeAnonymous = (e) => {
    e.preventDefault();
    setIsAnonymous(e.target.checked);
  };

  return (
    <form className="back">
      <div className="mb-3">
        <label className="form-label m-2 mb-0">
          <strong>{editing ? "비밀 글 수정하기" : "비밀 글 쓰기"}</strong>
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
          onChange={onChangeAnonymous}
        />
        익명
        <br />
        <div className="mb-3">
          <button
            className="button "
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              move("/secretboard/list");
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

SecretWritePage.propTypes = {
  editing: propTypes.bool,
};
SecretWritePage.defaultProps = {
  editing: false,
};

export default SecretWritePage;
