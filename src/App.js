import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

import { AuthContextProvider } from "./contexts/auth";

import RootDOM from "./RootDOM";

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <AuthContextProvider>
          <RootDOM />
        </AuthContextProvider>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
