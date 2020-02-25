import * as actionTypes from "./actionTypes";
export function addLabel(label) {
  return { type: actionTypes.ADD_LABEL, label };
}

export function editLabel(label, index) {
  return { type: actionTypes.EDIT_LABEL, label, index };
}

export function requestAddLabel() {
  return { type: actionTypes.REQUEST_ADD_LABEL };
}

export function requestEditLabel(index) {
  return { type: actionTypes.REQUEST_EDIT_LABEL, index };
}

export function closeLabelForm() {
  return { type: actionTypes.CLOSE_LABEL_FORM };
}
