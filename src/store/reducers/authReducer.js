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
        studentId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
