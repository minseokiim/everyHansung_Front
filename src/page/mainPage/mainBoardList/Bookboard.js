import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsBook } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import apiClient from "../../../apiClient";
import config from "../../../config";

const Bookboard = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`${config.API_BASE_URL}/member/${studentId}`)
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
    const res = await axios.get(`${config.API_BASE_URL}/book/all`);
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
    <div>
      <div>
        {currentPosts.length > 0 ? (
          currentPosts
            .sort((a, b) => b.id - a.id)
            .map((post) => {
              return (
                <div
                  key={post.id}
                  className="card-body cursor-pointer"
                  onClick={() => {
                    if (name) {
                      move(`/bookstore/${post.id}`);
                    } else {
                      alert("로그인 해야 게시물 확인 가능합니다.");
                    }
                  }}
                >
                  <div>
                    책방 &nbsp;
                    <span className="grey">
                      <BsBook /> &nbsp;
                      {post.bookName.length > 10
                        ? `${post.bookName.substring(0, 10)}...`
                        : post.bookName}
                      &nbsp;&nbsp;
                      <FaChalkboardTeacher /> &nbsp;
                      {post.lectureName}
                    </span>
                  </div>
                </div>
              );
            })
        ) : (
          <>
            <div
              className="card-body cursor-pointer"
              onClick={() => {
                if (name) {
                  move("/bookstore");
                } else {
                  alert("로그인 해야 게시물 확인 가능합니다.");
                }
              }}
            >
              책방 &nbsp;
              <span className="grey">거래중인 책이 없습니다.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookboard;
