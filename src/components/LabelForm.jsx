import React, { useReducer } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { Manager, Reference, Popper } from "react-popper";
import { TwitterPicker } from "react-color";

const UPDATE_LABEL = "UPDATE_LABEL";
const PICK_COLOR = "PICK_COLOR";
const SET_SHOW_COLORPICKER = "SET_SHOW_COLORPICKER";

const updateLabel = (field, value) => ({
  type: UPDATE_LABEL,
  payload: { field, value }
});
const pickColor = color => ({ type: PICK_COLOR, payload: color });
const setShowColorPicker = show => ({
  type: SET_SHOW_COLORPICKER,
  payload: show
});

const initialState = {
  label: {},
  showColorPicker: false,
  touched: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LABEL": {
      return {
        ...state,
        label: {
          ...state.label,
          [action.payload.field]: action.payload.value
        },
        touched: {
          ...state.touched,
          [action.payload.field]: true
        }
      };
    }
    case "PICK_COLOR": {
      return {
        ...state,
        showColorPicker: false,
        label: {
          ...state.label,
          color: action.payload
        }
      };
    }
    case "SET_SHOW_COLORPICKER": {
      console.log(action);
      return {
        ...state,
        showColorPicker: action.payload
      };
    }
    default:
      return state;
  }
};

const validateColor = color => color.match(/^#([0-9a-f]){3,6}$/i);
const validateName = name => 0 < name.length;

function LabelForm(props) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    label: props.label
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (validateColor(state.label.color) && validateName(state.label.name)) {
      props.onSubmit(state.label);
    } else {
      console.log("error");
    }
  };

  const handlePickerChange = color => {
    dispatch(pickColor(color.hex));
  };

  const fieldValidClassName = (field, validator) => {
    return state.touched[field]
      ? validator(state.label[field])
        ? "is-valid"
        : "is-invalid"
      : "";
  };

  return (
    <form className="needs-validation" onSubmit={handleSubmit}>
      <div className="form-group row">
        <div className="col-sm-12 mt-5">
          <label className="sr-only">Color</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <span
                  className="badge badge-secondary"
                  style={{ backgroundColor: state.label.color }}
                >
                  Color
                </span>
              </div>
            </div>
            <Manager>
              <Reference>
                {({ ref }) => (
                  <input
                    ref={ref}
                    type="text"
                    name="color"
                    className={`form-control ${fieldValidClassName(
                      "color",
                      validateColor
                    )}`}
                    placeholder="Color"
                    value={state.label.color || ""}
                    onFocus={() => {
                      dispatch(setShowColorPicker(true));
                    }}
                    onChange={e => {
                      const color = e.target.value;
                      dispatch(updateLabel("color", color));
                    }}
                  />
                )}
              </Reference>
              {state.showColorPicker ? (
                <Popper placement="top" positionFixed>
                  {({ ref, style, placement }) => (
                    <div ref={ref} style={style} data-placement={placement}>
                      <TwitterPicker
                        triangle="hide"
                        color={state.label.color}
                        onChange={handlePickerChange}
                      />
                    </div>
                  )}
                  >
                </Popper>
              ) : (
                ""
              )}
            </Manager>

            <div className="invalid-feedback">
              {state.touched.color &&
                !validateColor(state.label.color) &&
                "Should be a hex code"}
            </div>
          </div>
        </div>
        <div className="col-sm-12 my-3">
          <label className="sr-only"></label>
          <div className="input-group">
            <input
              type="text"
              name="name"
              className={`form-control ${fieldValidClassName(
                "name",
                validateName
              )}`}
              placeholder="Name"
              value={state.label.name || ""}
              onChange={e => {
                const name = e.target.value;
                dispatch(updateLabel("name", name));
              }}
            />
            <div className="invalid-feedback">
              {" "}
              {state.touched.name &&
                !validateName(state.label.name) &&
                "Name should not be empty"}
            </div>
          </div>
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary mb-2"
            disabled={
              !(
                validateColor(state.label.color) &&
                validateName(state.label.name)
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

LabelForm.propTypes = {
  label: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string
  })
};

LabelForm.defaultProps = {
  label: {
    name: "",
    color: ""
  }
};

export default LabelForm;
