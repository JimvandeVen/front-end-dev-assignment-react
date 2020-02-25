import { connect } from "react-redux";
import LabelList from "../components/LabelList";
import * as actions from "../actions";

const mapStateToProps = state => {
  return {
    labels: state.labelForm.labels,
    showEdit: state.labelForm.showEdit,
    showAddForm: state.labelForm.showAddForm
  };
};

const mapDispatchToProps = dispatch => ({
  onAddLabel: label => dispatch(actions.addLabel(label)),
  onEditLabel: (label, index) => dispatch(actions.editLabel(label, index)),
  onRequestAddLabel: () => dispatch(actions.requestAddLabel()),
  onCloseLabelForm: () => dispatch(actions.closeLabelForm()),
  onRequestEditLabel: index => dispatch(actions.requestEditLabel(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(LabelList);
