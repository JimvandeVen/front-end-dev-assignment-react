import React from "react";
import PropTypes from "prop-types";
import "../App.css";

class LabelForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      label: undefined
    };
  }

  isValid = () => {
    // TODO: Implement validation

    return true;
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      const merged = {
        ...this.props.label,
        ...this.state.label
      };
      this.props.onSubmit(e, merged);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
                className="form-control"
                placeholder="Color"
                value={
                  this.state.label?.color !== undefined
                    ? this.state.label.color
                    : this.props.label.color
                }
                onChange={e => {
                  const value = e.target.value;
                  this.setState(s => ({
                    ...s,
                    label: {
                      ...s.label,
                      color: value
                    }
                  }));
                }}
              />
            </div>
          </div>
          <div className="col-sm-12 my-3">
            <label className="sr-only"></label>
            <div className="input-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={
                  this.state.label?.name !== undefined
                    ? this.state.label.name
                    : this.props.label.name
                }
                onChange={e => {
                  const value = e.target.value;
                  this.setState(s => ({
                    ...s,
                    label: {
                      ...s.label,
                      name: value
                    }
                  }));
                }}
              />
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
