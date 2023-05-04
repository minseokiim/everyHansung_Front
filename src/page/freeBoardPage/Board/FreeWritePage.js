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
  const [countLike, setCountLike] = useState(0);
  const [updatedAt, setUpdatedAt] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");

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
        setUpdatedAt(res.data.updatedAt);
        setImageFile(res.data.imageFile);
      });
    }
  }, [id, editing]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      alert("제목을 입력하세요");
      return;
    } else if (content.trim().length === 0) {
      alert("본문을 입력하세요");
      return;
    }

    let base64Image = null;
    if (imageFile) {
      base64Image = await toBase64(imageFile);
    }

    const data = {
      studentId,
      title,
      content,
      isAnonymous,
      nickname,
      countLike,
      imageFile: base64Image,
    };

    if (editing) {
      apiClient
        .patch(`http://localhost:8080/freeboard/${studentId}/${id}`, data)
        .then(() => {
          move(`/freeboard/${id}`);
        });
    } else {
      apiClient.post("http://localhost:8080/freeboard", data).then(() => {
        move("/freeboard/list");
      });
    }
  };

  const onChangeIsAnonymous = (e) => {
    setIsAnonymous(e.target.checked);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
        <label htmlFor="imageFile">이미지 업로드:</label>
        <input
          type="file"
          id="imageFile"
          onChange={onImageChange}
          accept="image/*"
        />
        {previewImage && (
          <div>
            <img
              src={previewImage}
              alt="preview"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
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
