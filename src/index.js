import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LabelList from "./components/LabelList";
import * as serviceWorker from "./serviceWorker";

const Container = () => {
  const items = ["Foo", "Bar", "Baz", "Qux"];
  return <LabelList items={items} />;
};

ReactDOM.render(<Container />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
