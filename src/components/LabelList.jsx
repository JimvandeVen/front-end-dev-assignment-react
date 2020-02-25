import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import LabelForm from "./LabelForm.jsx";

// const LabelList = labels => {
//   return <ul>{console.log(labels)}</ul>;
// };

class LabelList extends React.Component {
  /*
  handleEditForm = (label, index) => {
    console.log("label =", label);
    
    this.setState({
      ...this.state,
      showEdit: false,
      showAddNew: true
    });
    const newLabels = R.update(index, label, this.props.labels);
    this.props.onChangeLabels(newLabels);
  };
  */

  /*handleAddForm(label) {
    this.setState({
      ...this.state,
      showEdit: false,
      showAddNew: true
    });
    const newLabels = R.append(label, this.props.labels);
    this.props.onChangeLabels(newLabels);
  }*/

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

        {index !== this.props.showEdit && (
          <button
            className="btn btn-sm btn-link editButton"
            onClick={() => this.props.onRequestEditLabel(index)}
          >
            Edit
          </button>
        )}

        {index === this.props.showEdit && (
          <div>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.props.onCloseLabelForm}
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <LabelForm
              index={index}
              label={label}
              onSubmit={label => this.props.onEditLabel(label, index)}
            />
          </div>
        )}
      </li>
    ));

    return (
      <ul className="list-group">
        {labels}
        {this.props.showAddForm ? (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={this.props.onCloseLabelForm}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <LabelForm onSubmit={this.props.onAddLabel} />
            </div>
          </li>
        ) : (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-link pl-0"
              onClick={this.props.onRequestAddLabel}
            >
              + add new
            </button>
          </li>
        )}
      </ul>
    );
  }
}

LabelList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.object),
  onAddLabel: PropTypes.func.isRequired,
  onRequestAddLabel: PropTypes.func.isRequired,
  showEdit: PropTypes.number,
  showAddForm: PropTypes.bool,
  onCloseLabelForm: PropTypes.func,
  onRequestEditLabel: PropTypes.func.isRequired
};

LabelList.defaultProps = {
  labels: [],
  showEdit: -1,
  showAddForm: false
};

export default LabelList;
