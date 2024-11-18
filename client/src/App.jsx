import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserData } from "./hook/context/User.jsx";
import Admin from "./pages/Admin";
import { Spinner } from "@chakra-ui/react";
import PlayList from "./pages/PlayList.jsx";
import Album from "./pages/Album.jsx";

function App() {
  const { loading, user, isAuth } = UserData();

  return (
    <>
      {loading ? (
        <Spinner display={"block"} alignItems={"center"} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/playlist"
              element={isAuth ? <PlayList user={user} /> : <Login />}
            />
            <Route
              path="/album/:id"
              element={isAuth ? <Album user={user} /> : <Login />}
            />
            <Route
              path="/playlist"
              element={isAuth ? <PlayList user={user} /> : <Login />}
            />
            <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
