import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { Manager, Reference } from "react-popper";

function LabelForm(props) {
  console.log(props.label);
  const [label, setLabel] = useState(props.label);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formState, setFormState] = useState({
    nameIsValid: true,
    colorIsValid: true
  });

  return (
    <form className="needs-validation" /*onSubmit={handleSubmit}*/>
      <div className="form-group row">
        <div className="col-sm-12 mt-5">
          <label className="sr-only">Color</label>
          <div className="input-group">
            <Manager>
              <Reference>
                {({ ref }) => (
                  <div className="input-group-prepend" ref={ref}>
                    <div className="input-group-text">
                      <span
                        className="badge badge-secondary"
                        style={{ backgroundColor: label.color }}
                      >
                        Color
                      </span>
                    </div>
                  </div>
                )}
              </Reference>
            </Manager>

            <input
              type="text"
              name="color"
              className={`form-control ${
                formState.colorIsValid ? "is-valid" : "is-invalid"
              }`}
              placeholder="Color"
              value={label.color}
              onFocus={() => {
                setShowColorPicker(true);
              }}
              onChange={e => {
                const color = e.target.value;
                this.validateColor(color);
                setLabel({
                  label: {
                    ...label,
                    color: color
                  }
                });
              }}
            />
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
              value={label.name}
              onChange={e => {
                const name = e.target.value;
                this.validateName(name);
                setLabel({
                  label: {
                    ...label,
                    name: name
                  }
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

// handleSubmit = e => {
//   e.preventDefault();
//   if (formState.nameIsValid && formState.colorIsValid) {
//     const merged = {
//       ...label,
//       ...this.state.label
//     };
//     this.props.onSubmit(merged);
//   } else {
//     console.log("error");
//   }
// };

//   validateName = name => {
//     if (!(0 < name.length)) {
//       this.setState(s => ({
//         ...s,
//         formState: {
//           ...s.formState,
//           nameIsValid: false,
//           nameError: "Name should not be empty!"
//         }
//       }));
//     } else {
//       this.setState(s => ({
//         ...s,
//         formState: {
//           ...s.formState,
//           nameIsValid: true
//         }
//       }));
//     }
//   };

//   validateColor = color => {
//     if (!color.match(/^#([0-9a-f]){3,6}$/i)) {
//       this.setState(s => ({
//         ...s,
//         formState: {
//           ...s.formState,
//           colorIsValid: false,
//           colorError: "Color should be a valid hexcode."
//         }
//       }));
//     } else {
//       this.setState(s => ({
//         ...s,
//         formState: {
//           ...s.formState,
//           colorIsValid: true
//         }
//       }));
//     }
//   };

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
