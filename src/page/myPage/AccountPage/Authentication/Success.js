import { AiFillCheckCircle } from "react-icons/ai";

const Success = () => {
  return (
    <div className="p-5 m-5">
      <div className="table-all">
        <AiFillCheckCircle />
        <span className="p-2">
          <strong>인증되었습니다.</strong>
        </span>
      </div>
    </div>
  );
};

export default Success;
