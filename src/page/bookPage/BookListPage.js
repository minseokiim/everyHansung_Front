import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsBook } from "react-icons/bs";

const BookListPage = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onSearch = (e) => {
    if (e.key === "Enter") {
      //검색
      getPosts();
    }
  };

  const getPosts = () => {
    axios
      .get("http://localhost:8080/bookstore")
      .then((res) => setPosts(res.data));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">책방</strong>
          <button
            className="m-2  write-button"
            onClick={() => {
              move("/bookstore/post");
            }}
          >
            작성하기
          </button>
        </div>
      </div>

      <hr />
      <div className="m-4">
        <input
          type="text"
          placeholder="검색어 입력"
          className="form-control"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyUp={onSearch}
        />
        <br />
        {posts.length > 0
          ? posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className=" card-body cursor-pointer"
                  onClick={() => move(`/bookstore/${post.id}`)}
                >
                  <div>
                    <BsBook />
                    &nbsp;
                    {post.lectureName} &nbsp;/ &nbsp;{post.bookName}
                  </div>
                </div>
              );
            })
          : "게시물이 없습니다."}
      </div>
    </div>
  );
};
export default BookListPage;
