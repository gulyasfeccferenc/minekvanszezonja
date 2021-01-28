import * as actionTypes from "./actions";

const initialState = {
  user: {
    login: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: state.user,
      };
    // case actionTypes.REM_PERSON:
    //     const updatedArray = state.persons.filter(result => result.id !== action.id);
    //     return {
    //         ...state,
    //         persons: updatedArray
    //     }
  }
  return state;
};

export default reducer;
