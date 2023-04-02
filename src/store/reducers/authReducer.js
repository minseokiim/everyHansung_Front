const initialState = {
  studentId: null,
};

export default function authReducer(state = initialState, action) {
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
}
