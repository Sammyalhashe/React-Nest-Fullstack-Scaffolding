import * as React from "react";
import HelloWorld from "./otherComponents/HelloWorld";

interface Iprops {
    initialData: any;
}

const App = (props: Iprops) => {
    console.log(props);
    return (
        <div>
            <HelloWorld />
        </div>
    );
};

export default App;
