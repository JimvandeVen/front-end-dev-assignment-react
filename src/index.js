import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LabelList from "./components/LabelList";
import { createStore } from "redux";
import labelList from "./reducers/reducer.js";

const store = createStore(labelList);

const initialState = {
  labels: [
    {
      name: "Foo",
      color: "#fcba03"
    },
    {
      name: "Bar",
      color: "#282db8"
    },
    {
      name: "Baz",
      color: "#9322bf"
    },
    {
      name: "Qux",
      color: "#218f1b"
    }
  ]
};

class Container extends React.Component {
  constructor() {
    super();

    this.state = initialState;
  }

  handleChangeLabels = newLabels => {
    this.setState(state => ({
      ...state,
      labels: newLabels
    }));
  };
  render() {
    return (
      <LabelList
        labels={this.state.labels}
        onChangeLabels={this.handleChangeLabels}
      />
    );
  }
}

ReactDOM.render(<Container />, document.getElementById("root"));
