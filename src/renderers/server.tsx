// https://github.com/elsassph/react-hot-ts/tree/master/
import { hot } from "react-hot-ts";
import axios from "axios";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import App from "../components/App";
import { config } from "../config";

export const serverRender = async () => {
    const { port, host } = config;
    const resp = await axios.get(`http://${host}:${port}/testData.json`);

    const initialData = resp.data;
    return {
        initialMarkup: hot(module)(
            ReactDOMServer.renderToString(<App initialData={initialData} />)
        ),
        initialData,
    };
};
