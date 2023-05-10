import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

Modal.setAppElement("#root"); //추가해서 오류 해결

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
