const initialState = {
  studentId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        studentId: action.payload.studentId,
      };
    case "LOGOUT":
      return {
        ...state,
        studentId: state.studentId, // 이전의 studentId 값을 유지함
      };
    default:
      return state;
  }
};

export default authReducer;
