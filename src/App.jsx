import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Layout from "./pages/Layout";
import supabase from "./connector";
import ListMahasiswa from "./mahasiswa/listMahasiswa";

const App = () => {
  const [session, setSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

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
        <Route path="/mahasiswa" element={<ListMahasiswa />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
