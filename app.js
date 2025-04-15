import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./src/Header";
import { Body } from "./src/Body";
import { AuthProvider } from "./src/context/AuthContext";

const AppComponent = () => {
  return (
    <AuthProvider>
      <div id="app">
        <Header />
        <Body />
      </div>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppComponent />);
