import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsBook } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

const BookListPage = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    filterPosts();
  };

  const filterPosts = () => {
    const filtered = posts.filter(
      (post) =>
        post.bookName.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase()) ||
        post.publisher.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const getPosts = () => {
    axios.get("http://localhost:8080/bookstore").then((res) => {
      setPosts(res.data);
      setFilteredPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="p-3">
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
      <div>
        <form onSubmit={onSearch}>
          <input
            type="text"
            placeholder="검색하고 싶은 수업명/교수님 성함/ 책 이름 입력하고 ENTER"
            className="form-control"
            value={search}
            onChange={onChangeSearch}
          />
        </form>
        <br />
        {filteredPosts.length > 0
          ? filteredPosts.map((post) => {
              return (
                <div
                  key={post.id}
                  className=" card-body cursor-pointer"
                  onClick={() => move(`/bookstore/${post.id}`)}
                >
                  <div>
                    <FaChalkboardTeacher /> &nbsp;
                    {post.lectureName}
                    <hr />
                    <BsBook /> &nbsp;
                    {post.bookName}&nbsp;/ {post.author}&nbsp;/ {post.publisher}
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
