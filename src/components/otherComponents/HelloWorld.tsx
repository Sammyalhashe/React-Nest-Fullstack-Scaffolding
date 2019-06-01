import * as React from "react";

interface Istate {
    name: string;
}

class HelloWorld extends React.Component<{}, Istate> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "sammy",
        };
    }
    render(): JSX.Element {
        return (
            <div>
                <b>Hello {this.state.name}!</b>
                <i>This is a change</i>
                <div>Hello Again</div>
            </div>
        );
    }
}

export default HelloWorld;
