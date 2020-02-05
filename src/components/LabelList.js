import React from "react";
import PropTypes from "prop-types";
import "../App.css";

class LabelList extends React.Component {
  constructor() {
    super();
    this.state = {
      showEdit: undefined,
      showAddNew: true
    };
  }

  render() {
    const listItems = this.props.items.map((item, index) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        key={index}
      >
        <span className="badge badge-secondary">{item}</span>

        {index !== this.state.showEdit && (
          <button
            className="btn btn-sm btn-link editButton"
            onClick={() => {
              this.setState({
                ...this.state,
                showEdit: index,
                showAddNew: true
              });
            }}
          >
            Edit
          </button>
        )}

        {index === this.state.showEdit && (
          <form action="">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => {
                this.setState({
                  ...this.state,
                  showEdit: undefined,
                  showAddNew: true
                });
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="form-group row">
              <div className="col-sm-12 mt-5">
                <label className="sr-only">Color</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span className="badge badge-secondary">Color</span>
                    </div>
                  </div>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-sm-12 my-3">
                <label className="sr-only">Label</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={item}
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
        )}
      </li>
    ));

    return (
      <ul className="list-group">
        {listItems}
        {this.state.showAddNew !== false && (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-link pl-0"
              onClick={() => {
                this.setState({
                  ...this.state,
                  showEdit: undefined,
                  showAddNew: undefined
                });
              }}
            >
              + add new
            </button>
          </li>
        )}
        {this.state.showAddNew === undefined && (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <form action="">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    showEdit: undefined,
                    showAddNew: true
                  });
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="form-group row">
                <div className="col-sm-12 mt-5">
                  <label className="sr-only">Color</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <span className="badge badge-secondary">Color</span>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-sm-12 my-3">
                  <label className="sr-only">Label</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Label"
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
          </li>
        )}
      </ul>
    );
  }
}

LabelList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  showIndex: PropTypes.number
};

export default LabelList;
