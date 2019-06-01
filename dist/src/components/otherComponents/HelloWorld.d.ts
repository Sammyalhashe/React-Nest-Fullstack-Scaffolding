import * as React from "react";
interface Istate {
    name: string;
}
declare class HelloWorld extends React.Component<{}, Istate> {
    constructor(props: any);
    render(): JSX.Element;
}
export default HelloWorld;
