import { useState, useEffect } from "react";
import apiClient from "../../apiClient";
import { useParams } from "react-router-dom";

const MessageListPage = () => {
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId");
  const [messages, setMessages] = useState([]);

  //아이디마다 받은 메세지 리스트 관리
  const getMessage = () => {
    apiClient.get(`http://localhost:8080/messages/${studentId}`).then((res) => {
      //setPost(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getMessage();
  }, []);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return <div className="p-3"> 받은쪽지들 모두 출력</div>;
};
export default MessageListPage;
