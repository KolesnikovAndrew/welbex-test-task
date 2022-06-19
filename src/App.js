import React from "react";
import Sorter from "./components/Sorter/Sorter";
import Table from "./components/Table/Table";

const appStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "1f1f1f",
};

function App() {
  return (
    <div className="App" style={appStyle}>
      <Table />
    </div>
  );
}

export default App;
