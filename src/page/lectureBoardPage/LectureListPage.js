import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Star from "./Star";
import { FaChalkboardTeacher } from "react-icons/fa";
import apiClient from "../../apiClient";

const LectureListPage = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const createArray = (length) => [...Array(length)];

  const onSearch = (e) => {
    if (e.key === "Enter") {
      filterPosts();
    }
  };

  const getPosts = () => {
    axios.get("http://localhost:8080/lecture/all").then((res) => {
      setPosts(res.data);
      setFilteredPosts(res.data);
    });
  };

  const filterPosts = () => {
    const filtered = posts.filter(
      (post) =>
        post.lectureName.toLowerCase().includes(searchText.toLowerCase()) ||
        post.professor.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="p-3">
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">강의평</strong>
          <button
            className="m-2  write-button"
            onClick={() => {
              move("/lectureboard/post");
            }}
          >
            작성하기
          </button>
        </div>
      </div>

      <hr />
      <div>
        <input
          type="text"
          placeholder="검색하고 싶은 수업명/교수님 성함 입력하고 ENTER"
          className="form-control"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            filterPosts();
          }}
          onKeyUp={onSearch}
        />
        <br />

        {filteredPosts.length > 0
          ? filteredPosts.map((post) => {
              return (
                <div
                  key={post.id}
                  className=" card-body cursor-pointer"
                  onClick={() => move(`/lectureboard/${post.id}`)}
                >
                  <div>
                    {createArray(5).map((n, i) => (
                      <Star key={i} selected={post.selectedStars > i} />
                    ))}
                    <hr />
                  </div>
                  <div>
                    <FaChalkboardTeacher />
                    &nbsp; {post.lectureName}, {post.professor} 교수님
                  </div>
                </div>
              );
            })
          : "게시물이 없습니다."}
      </div>
    </div>
  );
};
export default LectureListPage;
