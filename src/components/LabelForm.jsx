import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import { Manager, Reference } from "react-popper";

class LabelForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: undefined,
      showColorPicker: false,
      formState: {
        nameIsValid: true,
        colorIsValid: true
      }
    };
  }

  // handleColorChange = (color, event) => {
  //   console.log("color=", color.hex);
  //   this.validateColor(color.hex);
  //   this.setState(s => ({
  //     ...s,
  //     label: {
  //       ...s.label,
  //       color: color.hex
  //     }
  //   }));
  // };

  validateName = name => {
    if (!(0 < name.length)) {
      this.setState(s => ({
        ...s,
        formState: {
          ...s.formState,
          errors: {
            ...s.formState.errors,
            name: "Name should not be empty!"
          }
        }
      }));
    } else {
      this.setState(s => ({
        ...s,
        formState: {
          ...s.formState,
          errors: {
            ...s.formState.errors
          }
        }
      }));
    }
  };

  validateColor = color => {
    if (!color.match(/^#([0-9a-f]){3,6}$/i)) {
      this.setState(s => ({
        ...s,
        formState: {
          ...s.formState,
          colorIsValid: false,
          colorError: "Color should be a valid hexcode."
        }
      }));
    } else {
      this.setState(s => ({
        ...s,
        formState: {
          ...s.formState,
          colorIsValid: true
        }
      }));
    }
  };

  handleSubmit = e => {
    console.log("state = ", this.state);
    /* state has -> formState.name.isValid and formState.color.isValid or one or none
     if (formState.name.isValid === true and/or formState.name.isValid === true){
       .....
     } */

    e.preventDefault();
    if (this.state.formState) {
      const merged = {
        ...this.props.label,
        ...this.state.label
      };
      this.props.onSubmit(e, merged);
    } else {
      console.log("error");
    }
  };

  render() {
    return (
      <form className="needs-validation" onSubmit={this.handleSubmit}>
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
                          style={{
                            backgroundColor:
                              this.state.label?.color || this.props.label.color
                          }}
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
                  this.state.formState.colorIsValid === true
                    ? "is-valid"
                    : "is-invalid"
                }`}
                placeholder="Color"
                value={
                  this.state.label?.color !== undefined
                    ? this.state.label.color
                    : this.props.label.color
                }
                onFocus={() => {
                  this.setState(s => ({
                    ...s,
                    showColorPicker: true
                  }));
                }}
                onChange={e => {
                  const color = e.target.value;
                  this.validateColor(color);
                  this.setState(s => ({
                    ...s,
                    label: {
                      ...s.label,
                      color: color
                    }
                  }));
                }}
              />
              <div className="invalid-feedback">
                {this.state.formState?.colorError}
              </div>
            </div>
          </div>
          <div className="col-sm-12 my-3">
            <label className="sr-only"></label>
            <div className="input-group">
              <input
                type="text"
                name="name"
                className={`form-control ${
                  this.state.formState.nameIsValid === true
                    ? "is-valid"
                    : "is-invalid"
                }`}
                placeholder="Name"
                value={
                  this.state.label?.name !== undefined
                    ? this.state.label.name
                    : this.props.label.name
                }
                onChange={e => {
                  const name = e.target.value;
                  this.validateName(name);
                  this.setState(s => ({
                    ...s,
                    label: {
                      ...s.label,
                      name: name
                    }
                  }));
                }}
              />
              <div className="invalid-feedback">
                {this.state.formState.name?.error}
              </div>
            </div>
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              disabled={
                !(
                  this.state.formState.nameIsValid === true &&
                  this.state.formState.colorIsValid === true
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
