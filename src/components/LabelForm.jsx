import React from "react";
import PropTypes from "prop-types";
import "../App.css";

class LabelForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: undefined,
      formState: {}
    };
  }

  validateName = name => {
    if (!(0 < name.length)) {
      this.setState(s => ({
        ...s,
        formState: {
          ...s.formState,
          name: {
            isValid: false,
            error: "Name should not be empty."
          }
        }
      }));
    } else {
      this.setState(s => ({
        ...s,
        formState: {
          ...s.formState,
          name: {
            isValid: true
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
          color: {
            isValid: false,
            error: "Color should be a valid hexcode."
          }
        }
      }));
    } else {
      this.setState(s => ({
        ...s,
        formState: {
          ...s.formState,
          color: {
            isValid: true
          }
        }
      }));
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isNameValid === true && this.state.isColorValid === true) {
      const merged = {
        ...this.props.label,
        ...this.state.label
      };
      this.props.onSubmit(e, merged);
    }
  };

  render() {
    return (
      <form className="needs-validation" onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <div className="col-sm-12 mt-5">
            <label className="sr-only">Color</label>
            <div className="input-group">
              <div className="input-group-prepend">
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
              <input
                type="text"
                name="color"
                className={`form-control ${this.state.formState.color &&
                  (this.state.formState.color.isValid
                    ? "is-valid"
                    : "is-invalid")}`}
                placeholder="Color"
                value={
                  this.state.label?.color !== undefined
                    ? this.state.label.color
                    : this.props.label.color
                }
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
                {this.state.formState.color?.error}
              </div>
            </div>
          </div>
          <div className="col-sm-12 my-3">
            <label className="sr-only"></label>
            <div className="input-group">
              <input
                type="text"
                name="name"
                className={`form-control ${this.state.formState.name &&
                  (this.state.formState.name.isValid
                    ? "is-valid"
                    : "is-invalid")}`}
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
            <button type="submit" className="btn btn-primary mb-2">
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
