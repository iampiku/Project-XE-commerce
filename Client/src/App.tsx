import React from "react";
import { Header } from "./components";

const App: React.FC = () => {
  const [data, setData] = React.useState({ hi: 123 });

  async function getData() {
    const resp = await (await fetch("/api/data")).json();
    setData({ ...resp });
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
};

export default App;
