import { createContext, useContext, useEffect, useState } from "react";
import useShowToast from "../useShowToast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  async function registerUser(
    name,
    email,
    password,
    navigate,
    fetchSongs,
    fetchAlbums
  ) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      showToast("Success", data.message, "success");
      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
      navigate("/");
      fetchSongs();
      fetchAlbums();
    } catch (error) {
      showToast("Error", error.message, "error");
      setLoading(false);
    }
  }

  async function loginUser(email, password, navigate, fetchSongs, fetchAlbums) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      showToast("Success", data.message, "success");
      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
      navigate("/");
      fetchSongs();
      fetchAlbums();
    } catch (error) {
      showToast("Error", "Wrong Credentials", "error");
      setLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function logoutUser() {
    try {
      const { data } = await axios.get("/api/user/logout");

      window.location.reload();
    } catch (error) {
      showToast("Error", error.response.data.message, "error");
    }
  }

  async function addToPlaylist(id) {
    try {
      const { data } = await axios.post("/api/user/song/" + id);
      showToast("Success", data.message, "success");
      fetchUser();
    } catch (error) {
      showToast("Error", error.response.data.message, "error");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        user,
        isAuth,
        loading,
        logoutUser,
        addToPlaylist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
