import { memo, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserData } from "./hook/context/User.jsx";
import Admin from "./pages/Admin";
import { Box, Spinner } from "@chakra-ui/react";
import PlayList from "./pages/PlayList.jsx";
import Album from "./pages/Album.jsx";

function App() {
  const { loading, user, isAuth } = UserData();

  return (
    <>
      {loading ? (
        <Box width={"100%"} display={"flex"}  alignItems={"center"} height={"auto"}>
          <Spinner display={"flex"} alignItems={"center"}  />
        </Box>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <Home />} />
            <Route
              path="/playlist"
              element={isAuth ? <PlayList user={user} /> : <Login />}
            />
            <Route
              path="/album/:id"
              element={isAuth ? <Album user={user} /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default memo(App);
