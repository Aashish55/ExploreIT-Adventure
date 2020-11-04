import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

// polyfill all `core-js` features:
import "core-js";
// polyfill only stable `core-js` features - ES and web standards:
import "core-js/stable";
// polyfill only stable ES features:
import "core-js/es";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
