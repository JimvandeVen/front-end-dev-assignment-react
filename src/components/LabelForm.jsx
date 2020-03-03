import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { Manager, Reference, Popper } from "react-popper";
import { TwitterPicker } from "react-color";

function LabelForm(props) {
  const [label, setLabel] = useState(props.label);
  const [formState, setFormState] = useState({
    nameIsValid: true,
    colorIsValid: true,
    popoutVisible: false
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (formState.nameIsValid && formState.colorIsValid) {
      props.onSubmit(label);
    } else {
      console.log("error");
    }
  };

  const validateColor = color => {
    if (!color.match(/^#([0-9a-f]){3,6}$/i)) {
      setFormState({
        ...formState,
        colorIsValid: false,
        colorError: "Color should be a valid hexcode."
      });
    } else {
      setFormState({
        ...formState,
        colorIsValid: true
      });
    }
  };

  const validateName = name => {
    if (!(0 < name.length)) {
      setFormState({
        ...formState,
        nameIsValid: false,
        nameError: "Name should not be empty!"
      });
    } else {
      setFormState({
        ...formState,
        nameIsValid: true
      });
    }
  };

  function setPopoutVissible() {
    setFormState({
      ...formState,
      popoutVisible: true
    });
  }

  function setPopoutInvissible() {
    setFormState({
      ...formState,
      popoutVisible: false
    });
  }

  const handlePickerChange = (color, e) => {
    setFormState({
      ...formState,
      colorIsValid: true
    });
    setLabel({
      ...label,
      color: color.hex
    });
    setPopoutInvissible();
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
                  style={{ backgroundColor: label.color }}
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
                    className={`form-control ${
                      formState.colorIsValid ? "is-valid" : "is-invalid"
                    }`}
                    placeholder="Color"
                    value={label.color || ""}
                    onFocus={setPopoutVissible}
                    onChange={e => {
                      const color = e.target.value;
                      validateColor(color);
                      setLabel({
                        ...label,
                        color: color
                      });
                    }}
                  />
                )}
              </Reference>
              {formState.popoutVisible ? (
                <Popper placement="top" positionFixed>
                  {({ ref, style, placement, arrowProps }) => (
                    <div ref={ref} style={style} data-placement={placement}>
                      <TwitterPicker
                        triangle="hide"
                        color={label.color}
                        onChange={handlePickerChange}
                        // onChange={setPopoutInvissible}
                      />
                      <div
                        ref={arrowProps.ref}
                        style={{ height: 5, ...arrowProps.style }}
                      />
                    </div>
                  )}
                  >
                </Popper>
              ) : (
                ""
              )}
            </Manager>

            <div className="invalid-feedback">{formState?.colorError}</div>
          </div>
        </div>
        <div className="col-sm-12 my-3">
          <label className="sr-only"></label>
          <div className="input-group">
            <input
              type="text"
              name="name"
              className={`form-control ${
                formState.nameIsValid ? "is-valid" : "is-invalid"
              }`}
              placeholder="Name"
              value={label.name || ""}
              onChange={e => {
                const name = e.target.value;
                validateName(name);
                setLabel({
                  ...label,
                  name: name
                });
              }}
            />
            <div className="invalid-feedback">{formState.nameError}</div>
          </div>
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary mb-2"
            disabled={!(formState.nameIsValid && formState.colorIsValid)}
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
