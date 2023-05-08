import { useState, useEffect } from "react";
import apiClient from "../../apiClient";
import { useNavigate } from "react-router-dom";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

import "../../themes/calendar_green.css";
import TimeTableList from "./TimeTableList";

const ShowTimeTable = () => {
  const [timeTableData, setTimeTableData] = useState([]);
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchTimeTableData = async () => {
      try {
        const response = await apiClient.get(
          `http://localhost:8080/time/${studentId}`
        );
        if (response.status === 200) {
          setTimeTableData(response.data);
        } else {
          console.error("데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("오류 발생", error);
      }
    };

    fetchTimeTableData();
  }, []);

  const dayToNumber = (day) => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days.indexOf(day);
  };

  const sortByDayAndTime = (data) => {
    return data.sort((a, b) => {
      if (dayToNumber(a.day) === dayToNumber(b.day)) {
        return new Date(a.startTime) - new Date(b.startTime);
      }
      return dayToNumber(a.day) - dayToNumber(b.day);
    });
  };

  const deleteTimeTableItem = async (id) => {
    try {
      const response = await apiClient.delete(
        `http://localhost:8080/time/${id}`
      );

      if (response.status === 200) {
        setTimeTableData(timeTableData.filter((item) => item.id !== id));
      } else {
        console.error("시간표 항목을 삭제하는데 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생", error);
    }
  };

  const sortedTimeTableData = sortByDayAndTime(timeTableData);

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const config = {
    viewType: "Week",
    onTimeRangeSelected: async (args) => {
      // handle time range selection
    },
    onEventClick: async (args) => {
      // handle event click
    },
    headerDateFormat: "dddd",
    cellDuration: 60, // each cell represents 1 hour
    cellWidth: 150, // width of each cell
    timeHeaders: [
      // time header format
      { groupBy: "Day", format: "dddd" },
      { groupBy: "Hour", format: "h tt" },
    ],
    businessBeginsHour: 9, // start from 9 AM
    businessEndsHour: 23, // end at 11 PM
  };

  const events = timeTableData.map((item) => {
    const startDate = new Date(item.startTime);
    const endDate = new Date(item.endTime);

    const startDay = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + (dayToNumber(item.day) - new Date().getDay())
    );

    const startDateWithDay = new Date(startDay);
    startDateWithDay.setHours(startDate.getHours(), startDate.getMinutes());

    const endDateWithDay = new Date(startDay);
    endDateWithDay.setHours(endDate.getHours(), endDate.getMinutes());

    return {
      start: startDateWithDay,
      end: endDateWithDay,
      id: item.id,
      text: `${item.subject} - ${item.professor} - ${item.room}`,
    };
  });

  return (
    <div className="p-3">
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">시간표</strong>
          <button
            className="m-2 write-button"
            onClick={() => {
              move("/timetable/post");
            }}
          >
            작성하기
          </button>
        </div>
      </div>
      <hr />

      <TimeTableList
        timeTableData={timeTableData}
        deleteTimeTableItem={deleteTimeTableItem}
        formatTime={formatTime}
      />
      <div className="calendar-container">
        <DayPilotCalendar {...config} events={events} />
      </div>
    </div>
  );
};

export default ShowTimeTable;
