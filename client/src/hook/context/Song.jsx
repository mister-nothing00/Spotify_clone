import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import useShowToast from "../useShowToast";
import { audioService } from "../../utils/audioService";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(true);

  // Inizializza gli stati con i valori dal servizio audio
  const [selectedSong, setSelectedSong] = useState(audioService.currentSongId);
  const [isPlaying, setIsPlaying] = useState(audioService.isPlaying);
  const showToast = useShowToast();

  // Sincronizza lo stato di riproduzione con il servizio audio
  useEffect(() => {
    const removeStateChangeListener = audioService.onStateChange((state) => {
      setIsPlaying(state.isPlaying);

      // Se il servizio audio ha cambiato canzone, aggiorna selectedSong
      if (state.currentSongId && state.currentSongId !== selectedSong) {
        setSelectedSong(state.currentSongId);
      }
    });

    return () => {
      removeStateChangeListener();
    };
  }, [selectedSong]);

  const fetchSongs = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/song/all");
      setSongs(data);

      // Solo se non c'è una canzone già selezionata, impostiamo la prima
      if (!selectedSong && data.length > 0) {
        setSelectedSong(data[0]._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSongLoading(false);
    }
  }, [selectedSong]);

  const [song, setSong] = useState(null);

  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) return;

    try {
      const { data } = await axios.get("/api/song/single/" + selectedSong);
      setSong(data);
    } catch (error) {
      console.log(error);
    }
  }, [selectedSong]);

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
      showToast(
        error.response?.data?.message || "Errore durante l'aggiunta dell'album"
      );
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
      setLoading(false);
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

  const fetchAlbums = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/song/album/all");
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function deleteSong(id) {
    try {
      const { data } = await axios.delete("/api/song/" + id);
      showToast("Success", data.message, "success");
      fetchSongs();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }

  // Carica le canzoni e gli album all'avvio
  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, [fetchSongs, fetchAlbums]);

  const [index, setIndex] = useState(0);

  // Sincronizza l'indice con l'array delle canzoni quando selectedSong cambia
  useEffect(() => {
    if (selectedSong && songs.length > 0) {
      const newIndex = songs.findIndex((song) => song._id === selectedSong);
      if (newIndex !== -1 && newIndex !== index) {
        setIndex(newIndex);
      }
    }
  }, [selectedSong, songs, index]);

  const nextMusic = useCallback(() => {
    if (!songs.length) return;

    let newIndex;
    if (index >= songs.length - 1) {
      newIndex = 0;
    } else {
      newIndex = index + 1;
    }

    setIndex(newIndex);
    setSelectedSong(songs[newIndex]._id);
    setIsPlaying(true);
  }, [index, songs]);

  const prevMusic = useCallback(() => {
    if (!songs.length) return;

    if (index <= 0) return;

    const newIndex = index - 1;
    setIndex(newIndex);
    setSelectedSong(songs[newIndex]._id);
    setIsPlaying(true);
  }, [index, songs]);

  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  const fetchAlbumSong = useCallback(async (id) => {
    try {
      const { data } = await axios.get("/api/song/album/" + id);
      setAlbumSong(data.song);
      setAlbumData(data.album);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Quando cambia la selectedSong, aggiorna lo stato di riproduzione
  useEffect(() => {
    if (audioService.currentSongId !== selectedSong) {
      // Se stiamo cambiando canzone e il player stava suonando,
      // continuiamo a suonare la nuova canzone
      if (isPlaying) {
        // Lasciamo che il caricamento della canzone avvenga quando
        // fetchSingleSong recupera i dati e aggiorna song
      }
    }
  }, [selectedSong, isPlaying]);

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
