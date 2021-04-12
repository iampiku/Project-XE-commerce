import React from "react";

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
      <div className="bg-gray-50 p-3 mb-6">
        <h1>Welcome To Project EcommerceX</h1>
      </div>
      <pre>{JSON.stringify(data, null, 3)}</pre>
    </React.Fragment>
  );
};

export default App;
