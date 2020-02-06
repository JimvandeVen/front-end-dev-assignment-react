import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import "../App.css";
import LabelForm from "./LabelForm.jsx";

class LabelList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showEdit: undefined,
      showAddNew: true
    };
  }

  handleEditForm = (label, index) => {
    const newLabels = R.update(index, label, this.props.labels);
    this.props.onChangeLabels(newLabels);
    /*
    this.setState(state => ({
      ...state,
      labels: R.update(index, label, this.props.labels)
    }));
    */
  };

  // handleAddForm(item) {
  //   this.setState(state => ({
  //     ...state,
  //     items: R.append(item, items)
  //   }));
  // }

  render() {
    console.log("state  = ", this.state);
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
              <LabelForm />
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
