import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <Router>
      <div>
        <h1>RBAC Dashboard</h1>
        <Routes>
          <Route path="/" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
