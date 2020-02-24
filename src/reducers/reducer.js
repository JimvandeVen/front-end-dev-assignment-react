import {
  ADD_LABEL,
  EDIT_LABEL,
  SET_FORM_STATE,
  SHOW_EDIT,
  SHOW_ADD_NEW
} from "../actions/actions.js";
import { combineReducers } from "redux";

const initialState = {
  showAddNew: false,
  showEdit: false,
  formState: {
    nameIsValid: true,
    colorIsValid: true
  },
  labels: [
    {
      name: "Foo",
      color: "#fcba03"
    },
    {
      name: "Bar",
      color: "#282db8"
    },
    {
      name: "Baz",
      color: "#9322bf"
    },
    {
      name: "Qux",
      color: "#218f1b"
    }
  ]
};

function labelForm(state = initialState, action) {
  switch (action.type) {
    case ADD_LABEL:
      return Object.assign({}, state, {
        labels: [...state.labels, action.label]
      });
    case EDIT_LABEL:
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
    case SET_FORM_STATE:
      return Object.assign({}, state, {
        state: {
          ...state,
          formState: action.formState
        }
      });
    default:
      return state;
  }
}

function formVisibility(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_NEW:
      return Object.assign({}, state, {
        state: {
          ...state,
          showAddNew: action.boolean
        }
      });
    default:
      return state;
  }
}

const labelList = combineReducers({
  labelForm,
  formVisibility
});

export default labelList;
