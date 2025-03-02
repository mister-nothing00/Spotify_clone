import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import useShowToast from "../useShowToast";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(true);

  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const showToast = useShowToast();

  async function fetchSongs() {
    try {
      const { data } = await axios.get("/api/song/all");

      setSongs(data);
      setSelectedSong(data[0]._id);
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    }
  }

  const [song, setSong] = useState([]);

  async function fetchSingleSong() {
    try {
      const { data } = await axios.get("/api/song/single/" + selectedSong);

      setSong(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/album/new", formData);
      showToast("Success", data.message, "success");
      setLoading(false);
      fetchAlbums();
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      showToast(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function addSong(
    formData,
    setTitle,
    setDescription,
    setFile,
    setSinger,
    setAlbum
  ) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/new", formData);
      showToast("Success", data.message, "success");
      setLoading(false)
      fetchSongs();
      setTitle("");
      setDescription("");
      setFile(null);
      setSinger("");
      setAlbum("");
    } catch (error) {
      showToast("Error", error.message, "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function addThumbnail(id, formData, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/" + id, formData);
      showToast("Success", data.message, "success");
      setLoading(false);
      fetchSongs();
      setFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
      setLoading(false);
    }
  }

  const [albums, setAlbums] = useState([]);

  async function fetchAlbums() {
    try {
      const { data } = await axios.get("/api/song/album/all");

      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteSong(id) {
    try {
      const { data } = await axios.delete("/api/song/" + id);

      showToast("Success", data.message, "success");
      fetchSongs();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  const [index, setIndex] = useState(0);

  function nextMusic() {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]._id);
    } else {
      setIndex(index + 1);
      setSelectedSong(songs[index + 1]._id);
    }
  }
  function prevMusic() {
    if (index === 0) {
      return null;
    } else {
      setIndex(index - 1);
      setSelectedSong(songs[index - 1]._id);
    }
  }

  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  async function fetchAlbumSong(id) {
    try {
      const { data } = await axios.get("/api/song/album/" + id);
      setAlbumSong(data.song);
      setAlbumData(data.album);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SongContext.Provider
      value={{
        songs,
        addAlbum,
        loading,
        songLoading,
        albums,
        addSong,
        addThumbnail,
        deleteSong,
        fetchSingleSong,
        song,
        setSelectedSong,
        selectedSong,
        isPlaying,
        setIsPlaying,
        nextMusic,
        prevMusic,
        fetchAlbumSong,
        albumSong,
        albumData,
        fetchSongs,
        fetchAlbums,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);
