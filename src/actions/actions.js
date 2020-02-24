export const ADD_LABEL = "ADD_LABEL";
export const EDIT_LABEL = "EDIT_LABEL";
export const SET_FORM_STATE = "SET_FORM_STATE";
export const SHOW_EDIT = "SHOW_EDIT";
export const SHOW_ADD_NEW = "SHOW_ADD_NEW";

export function addLabel(label) {
  return { type: ADD_LABEL, label };
}

export function editLabel(label, index) {
  return { type: EDIT_LABEL, label, index };
}

export function setFormState(formState) {
  return { type: SET_FORM_STATE, formState };
}

export function showEdit(boolean) {
  return { type: SHOW_EDIT, boolean };
}

export function showAddNew(boolean) {
  return { type: SHOW_ADD_NEW, boolean };
}
