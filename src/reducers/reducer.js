import * as actionTypes from "../actionTypes";
import { combineReducers } from "redux";

const initialState = {
  showAddForm: false,
  showEdit: -1,
  labels: []
};

function labelsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.label],
        showEdit: -1,
        showAddForm: false
      };
    case actionTypes.EDIT_LABEL:
      return Object.assign({}, state, {
        labels: state.labels.map((label, index) => {
          if (index === action.index) {
            return Object.assign({}, label, {
              name: action.label.name,
              color: action.label.color
            });
          }
          return label;
        })
      });
    case actionTypes.REQUEST_ADD_LABEL:
      return {
        ...state,
        showAddForm: true
      };
    case actionTypes.REQUEST_EDIT_LABEL:
      return {
        ...state,
        showEdit: action.index
      };
    case actionTypes.CLOSE_LABEL_FORM:
      return {
        ...state,
        showAddForm: false,
        showEdit: -1
      };
    default:
      return state;
  }
}

const labelList = combineReducers({
  labelForm: labelsReducer
});

export default labelList;
