import axios from "axios";

export const login = (studentId, passwd) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/login", {
      studentId,
      passwd,
    });

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { studentId },
    });
  } catch (error) {
    // 여기에서 에러 처리를 할 수 있습니다.
  }
};

export const logout = () => ({
  type: "LOGOUT",
});
