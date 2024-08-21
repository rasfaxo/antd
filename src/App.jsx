import React, { useState } from "react";
import Login from "./assets/components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./assets/components/Register";
import Layout from "./assets/screen/Layout";

const App = () => {
  const [session, setSession] = useState(false);

  if (!session) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>Dashboard</h1>} />
        <Route path="/mahasiswa" element={<h1>Mahasiswa</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
