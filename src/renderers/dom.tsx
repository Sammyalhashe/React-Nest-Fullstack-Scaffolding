// https://github.com/elsassph/react-hot-ts/tree/master/
import { hot } from "react-hot-ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../components/App";

declare global {
    interface Window {
        initialData: any;
    }
}

const initialData = window.initialData;

hot(module)(
    ReactDOM.hydrate(
        <App initialData={initialData} />,
        document.getElementById("root")
    )
);
