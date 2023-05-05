import { useEffect, useState } from "react";
import "./FreeWritePage.css";
import { useNavigate, useParams } from "react-router-dom";
import propTypes from "prop-types";
import apiClient from "../../../apiClient";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

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
      apiClient.get(`http://localhost:8080/freeboard/${id}`).then((res) => {
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
        move("/freeboard");
      });
    }
  };

  const onChangeIsAnonymous = (e) => {
    setIsAnonymous(e.target.checked);
  };

  const removeImage = () => {
    setImageFile("");
    setPreviewImage("");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setImageFile("");
      setPreviewImage("");
    }
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
        <label htmlFor="imageFile" className="d-inline-block">
          <AiOutlinePaperClip
            className="icon"
            style={{ cursor: "pointer" }}
            size={24}
          />
        </label>
        <input
          type="file"
          id="imageFile"
          onChange={onImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        {imageFile && (
          <BsFillTrashFill
            onClick={removeImage}
            style={{ cursor: "pointer", marginLeft: "10px" }}
            size={20}
            className="icon"
          />
        )}
        {previewImage && (
          <div>
            <img
              src={previewImage}
              alt="preview"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
        )}
        <span className="grey">사진은 한장만 선택 가능합니다.</span>
      </div>

      <div className="mb-3 d-flex align-items-center">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={onChangeIsAnonymous}
        />
        <span>익명</span>
        <div className="ms-auto">
          <button
            className="dan-button"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              move("/freeboard");
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
