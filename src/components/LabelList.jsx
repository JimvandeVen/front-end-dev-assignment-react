import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import LabelForm from "./LabelForm.jsx";

const LabelList = props => (
  <ul className="list-group">
    {props.labels.map((label, index) => (
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

        {index !== props.showEdit && (
          <button
            className="btn btn-sm btn-link editButton"
            onClick={() => props.onRequestEditLabel(index)}
          >
            Edit
          </button>
        )}

        {index === props.showEdit && (
          <div>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={props.onCloseLabelForm}
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <LabelForm
              index={index}
              label={label}
              onSubmit={label => props.onEditLabel(label, index)}
            />
          </div>
        )}
      </li>
    ))}
    {props.showAddForm ? (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={props.onCloseLabelForm}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <LabelForm onSubmit={props.onAddLabel} />
        </div>
      </li>
    ) : (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-link pl-0"
          onClick={props.onRequestAddLabel}
        >
          + add new
        </button>
      </li>
    )}
  </ul>
);

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
