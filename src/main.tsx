import React from "react";
import ReactDOM from "react-dom/client";
import isValidProp from "@emotion/is-prop-valid";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { store } from "./redux/store";
import router from "./router/Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StyleSheetManager>
  </React.StrictMode>
);
