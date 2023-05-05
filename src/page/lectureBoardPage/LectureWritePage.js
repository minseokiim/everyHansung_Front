import { useState } from "react";
import "./LectureWritePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Star from "./Star";

const LectureWritePage = () => {
  const [content, setContent] = useState("");
  const move = useNavigate();
  const [professor, setProfessor] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const [semester, setSemester] = useState("평가 안함");
  const [homework, setHomework] = useState("평가 안함");
  const [score, setScore] = useState("평가 안함");
  const [test, setTest] = useState("평가 안함");
  const [team, setTeam] = useState("평가 안함");
  const createArray = (length) => [...Array(length)];

  const onSubmit = (e) => {
    e.preventDefault();

    if (lectureName.trim().length === 0) {
      alert("강의명을 입력하세요");
      return;
    } else if (professor.trim().length === 0) {
      alert("교수님 성함을 입력하세요");
      return;
    } else if (content.trim().length === 0) {
      alert("본문을 입력하세요");
      return;
    } else {
      axios
        .post("http://localhost:8080/lecture/register", {
          lectureName,
          professor,
          selectedStars,
          semester,
          homework,
          score,
          test,
          team,
          content,
        })
        .then(() => {
          alert("작성되었습니다!");
          move("/lectureboard");
        });
    }
  };

  return (
    <form className="lec-back">
      <div className="mb-3">
        <label className="form-label m-2 mb-0">
          <strong>강의평 쓰기</strong>{" "}
        </label>
        <hr />

        <div className="mb-3">
          <input
            className="form-control"
            value={lectureName}
            onChange={(e) => {
              setLectureName(e.target.value);
            }}
            placeholder="강의명을 입력해주세요."
          ></input>
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            value={professor}
            onChange={(e) => {
              setProfessor(e.target.value);
            }}
            placeholder="교수님 성함만 입력해주세요."
          ></input>
        </div>

        <div className="mb-3 p-1">
          *별점
          <br />
          {createArray(5).map((n, i) => (
            <Star
              key={i}
              selected={selectedStars > i}
              onSelect={() => setSelectedStars(i + 1)}
            />
          ))}
          &nbsp;&nbsp;
          {selectedStars} / 5
          <br />
        </div>

        <div className="mb-3 p-1">
          <label>*수강학기 선택</label>
          <br />

          <select
            size="3"
            id="semester"
            multiple="multiple"
            onChange={(e) => {
              setSemester(e.target.value);
            }}
          >
            <option value="2023-1학기"> 2023-1학기</option>
            <option value="2022-2학기"> 2022-2학기</option>
            <option value="2022-1학기"> 2022-1학기</option>
            <option value="2021-2학기"> 2021-2학기</option>
            <option value="2021-1학기"> 2021-1학기</option>
            <option value="~2020-2학기"> ~2020-2학기</option>
          </select>
          <br />
        </div>

        <div className="mb-3 p-1">
          *과제 양 <br />
          <input
            type="radio"
            name="homework"
            value="많음"
            onChange={(e) => {
              setHomework(e.target.value);
            }}
          />
          많음 &nbsp;&nbsp;
          <input
            type="radio"
            name="homework"
            value="보통"
            onChange={(e) => {
              setHomework(e.target.value);
            }}
          />
          보통 &nbsp;&nbsp;
          <input
            type="radio"
            name="homework"
            value="적음"
            onChange={(e) => {
              setHomework(e.target.value);
            }}
          />
          적음
        </div>

        <div className="mb-3 p-1">
          *성적 기준 <br />
          <input
            type="radio"
            name="score"
            value="너그러움 "
            onChange={(e) => {
              setScore(e.target.value);
            }}
          />
          너그러움 &nbsp;&nbsp;
          <input
            type="radio"
            name="score"
            value="보통"
            onChange={(e) => {
              setScore(e.target.value);
            }}
          />
          보통 &nbsp;&nbsp;
          <input
            type="radio"
            name="score"
            value="깐깐함"
            onChange={(e) => {
              setScore(e.target.value);
            }}
          />
          깐깐함
        </div>

        <div className="mb-3 p-1">
          *시험횟수 <br />
          <input
            type="radio"
            name="test"
            value="3회 이상"
            onChange={(e) => {
              setTest(e.target.value);
            }}
          />
          3회 이상 &nbsp;&nbsp;
          <input
            type="radio"
            name="test"
            value="2회"
            onChange={(e) => {
              setTest(e.target.value);
            }}
          />
          2회&nbsp;&nbsp;
          <input
            type="radio"
            name="test"
            value="1회"
            onChange={(e) => {
              setTest(e.target.value);
            }}
          />
          1회&nbsp;&nbsp;
          <input
            type="radio"
            name="test"
            value="안봄"
            onChange={(e) => {
              setTest(e.target.value);
            }}
          />
          안봄
        </div>

        <div className="mb-3 p-1">
          *조 모임 <br />
          <input
            type="radio"
            name="team"
            value=" 많음"
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          />
          많음 &nbsp;&nbsp;
          <input
            type="radio"
            name="team"
            value="보통"
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          />
          보통&nbsp;&nbsp;
          <input
            type="radio"
            name="team"
            value="없음"
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          />
          없음
        </div>

        <textarea
          className="form-control"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          rows="8"
          placeholder="이 강의에 대한 총평을 작성해주세요."
        ></textarea>
      </div>

      <div>
        <div className="important">
          ** 강의평은 수정 및 삭제 불가능 하니 신중하게 작성해주세요.
        </div>
        <br />
        <button
          className="dan-button mb-3"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            move("/lectureboard");
          }}
        >
          돌아가기
        </button>
        <button className="lec-button mb-3" type="submit" onClick={onSubmit}>
          평가하기
        </button>
      </div>
    </form>
  );
};

export default LectureWritePage;
