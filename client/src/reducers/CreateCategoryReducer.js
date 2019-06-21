import {
  SHOW_CREATE_CATEGORY,
  HIDE_CREATE_CATEGORY
} from "../actions/ActionTypes";

const initialState = {
  visibility: false
};

export default function createCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_CATEGORY:
      return Object.assign({}, state, {
        visibility: true
      });
    case HIDE_CREATE_CATEGORY:
      return initialState;
    default:
      return state;
  }
}
