import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LabelList from "./components/LabelList";
import * as serviceWorker from "./serviceWorker";

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
    console.log("state = ", this.state);
    return (
      <LabelList
        labels={this.state.labels}
        onChangeLabels={this.handleChangeLabels}
      />
    );
  }
}

ReactDOM.render(<Container />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
