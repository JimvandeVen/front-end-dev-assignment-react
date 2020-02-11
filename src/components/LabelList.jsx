import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import "../App.css";
import LabelForm from "./LabelForm.jsx";

class LabelList extends React.Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      showAddNew: true
    };
  }

  handleEditForm = (label, index) => {
    this.setState({
      ...this.state,
      showEdit: false,
      showAddNew: true
    });
    const newLabels = R.update(index, label, this.props.labels);
    this.props.onChangeLabels(newLabels);
  };

  handleAddForm(label) {
    this.setState({
      ...this.state,
      showEdit: false,
      showAddNew: true
    });
    const newLabels = R.append(label, this.props.labels);
    this.props.onChangeLabels(newLabels);
  }

  render() {
    const labels = this.props.labels.map((label, index) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        key={index}
      >
        <span
          className="badge badge-secondary"
          style={{ backgroundColor: label.color }}
        >
          {label.name}
        </span>

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
          <div>
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

            <LabelForm
              index={index}
              label={label}
              onSubmit={(e, label) => this.handleEditForm(label, index)}
            />
          </div>
        )}
      </li>
    ));

    return (
      <ul className="list-group">
        {labels}
        {this.state.showAddNew !== false && (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-link pl-0"
              onClick={() => {
                this.setState({
                  ...this.state,
                  showEdit: undefined,
                  showAddNew: false
                });
              }}
            >
              + add new
            </button>
          </li>
        )}

        {this.state.showAddNew === false && (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
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
              <LabelForm onSubmit={(e, label) => this.handleAddForm(label)} />
            </div>
          </li>
        )}
      </ul>
    );
  }
}

LabelList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.object),
  showIndex: PropTypes.number
};

export default LabelList;
