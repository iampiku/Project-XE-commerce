import React from "react";
import { AuthProvider } from "./context/auth.context";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <AuthProvider>
        {/* entry point of dashboard */}
      </AuthProvider>
    </React.Fragment>
  );
};

export default App;
