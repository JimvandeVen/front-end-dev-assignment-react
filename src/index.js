import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ConnectedLabelList from "./containers/ConnectedLabelList";
import labelFormReducer from "./reducers/reducer.js";
import "./index.css";

const labels = Object.freeze([
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
]);

const store = createStore(
  labelFormReducer,
  {
    labelForm: {
      labels
    }
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <ConnectedLabelList />
  </Provider>,
  document.getElementById("root")
);
