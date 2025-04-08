import React from "react";
import ReactDOM from "react-dom/client";

const AppComponent = () => {
  return <div id="app"></div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppComponent />);
