import { BsFillTrashFill } from "react-icons/bs";

const TimeTableList = ({ timeTableData, deleteTimeTableItem, formatTime }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>과목</th>
          <th>교수</th>
          <th>강의실</th>
          <th>요일</th>
          <th>시작</th>
          <th>종료</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {timeTableData.map((item, index) => (
          <tr key={index}>
            <td>{item.subject}</td>
            <td>{item.professor}</td>
            <td>{item.room}</td>
            <td>{item.day}</td>
            <td>{formatTime(item.startTime)}</td>
            <td>{formatTime(item.endTime)}</td>
            <td>
              {/* <AiFillEdit
                className="icon cursor-pointer"
                // onClick={() => editTimeTableItem(item.id)}
                // 수정하려면 show를 만들어서 editing값 넘겨야됨 ->show를 굳이?
              /> */}
              <BsFillTrashFill
                className="icon cursor-pointer"
                onClick={() => {
                  if (window.confirm("이 수업을 삭제하시겠습니까?")) {
                    deleteTimeTableItem(item.id);
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeTableList;
