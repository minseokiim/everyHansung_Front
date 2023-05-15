import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsBook } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import apiClient from "../../../apiClient";

const Bookboard = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); //페이지네이션
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}`)
        .then((res) => {
          const member = res.data;
          setName(member.username);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    }
  }, [studentId]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const filterPosts = () => {
    const filtered = posts.filter(
      (post) =>
        post.bookName.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase()) ||
        post.publisher.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const getPosts = async () => {
    const res = await axios.get("http://localhost:8080/book/all");
    const sortedPosts = res.data.sort((a, b) => b.id - a.id);
    setPosts(sortedPosts);
    filterPosts(sortedPosts);
  };

  useEffect(() => {
    getPosts();
  }, [posts.length]);

  useEffect(() => {
    filterPosts();
  }, [posts]);

  return (
    <div className="p-3">
      <div>
        <div className="d-flex justify-content-between"></div>
      </div>
      <div>
        {currentPosts.length > 0 ? (
          currentPosts
            .sort((a, b) => b.id - a.id) //최신순
            .map((post) => {
              return (
                <div
                  key={post.id}
                  className=" cursor-pointer"
                  onClick={() => {
                    if (name) {
                      move(`/bookstore/${post.id}`);
                    } else {
                      alert("로그인 해야 게시물 확인 가능합니다");
                    }
                  }}
                >
                  <div>
                    - 책방 &nbsp;
                    <span className="grey">
                      <BsBook /> &nbsp;
                      {post.bookName}&nbsp;&nbsp;
                      <FaChalkboardTeacher /> &nbsp;
                      {post.lectureName}
                    </span>
                  </div>
                </div>
              );
            })
        ) : (
          <>
            - 책방 &nbsp; <span className="grey"> 거래중인 책이 없습니다</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookboard;
