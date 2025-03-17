class AudioService {
  constructor() {
    this.audio = new Audio();
    this.isPlaying = false;
    this.currentSongId = null;
    this.currentSongData = null;
    this.onTimeUpdateCallbacks = [];
    this.onLoadedMetadataCallbacks = [];
    this.onEndedCallbacks = [];
    this.onStateChangeCallbacks = [];

    this.audio.addEventListener("timeupdate", () => {
      this.onTimeUpdateCallbacks.forEach((callback) =>
        callback(this.audio.currentTime, this.audio.duration)
      );
    });

    this.audio.addEventListener("loadedmetadata", () => {
      this.onLoadedMetadataCallbacks.forEach((callback) =>
        callback(this.audio.duration)
      );
    });

    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      this.notifyStateChange();
      this.onEndedCallbacks.forEach((callback) => callback());
    });

    this.audio.addEventListener("error", (e) => {
      console.error("Errore nella riproduzione audio:", e);
      this.isPlaying = false;
      this.notifyStateChange();
    });
  }

  loadSong(songData) {
    if (!songData || !songData.audio || !songData.audio.url) return false;

    // Se è la stessa canzone, non ricarichiamo
    if (this.currentSongId === songData._id) return true;

    // Memorizza lo stato di riproduzione attuale
    const wasPlaying = this.isPlaying;

    // Pausa l'audio attuale
    this.audio.pause();

    // Salva l'ID e i dati della canzone
    this.currentSongId = songData._id;
    this.currentSongData = songData;

    // Aggiorna la source dell'audio
    this.audio.src = songData.audio.url;
    this.audio.load();

    // Ripristina la riproduzione se era in corso
    if (wasPlaying) {
      this.play();
    } else {
      this.isPlaying = false;
      this.notifyStateChange();
    }

    return true;
  }

  play() {
    if (!this.audio.src) return false;

    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notifyStateChange();
        })
        .catch((error) => {
          console.error("Errore durante la riproduzione:", error);
          this.isPlaying = false;
          this.notifyStateChange();
        });
    }

    return true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.notifyStateChange();
    return true;
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  seek(time) {
    if (!this.audio) return;

    // Verifica che il tempo richiesto sia valido
    if (isNaN(time) || time < 0 || time > this.audio.duration) {
      console.warn("Tempo di seek non valido:", time);
      return;
    }

    this.audio.currentTime = time;
  }

  setVolume(volume) {
    if (!this.audio) return;

    // Verifica che il volume sia valido
    if (isNaN(volume) || volume < 0 || volume > 1) {
      console.warn("Volume non valido:", volume);
      return;
    }

    this.audio.volume = volume;
  }

  getCurrentTime() {
    return this.audio ? this.audio.currentTime : 0;
  }

  getDuration() {
    return this.audio && !isNaN(this.audio.duration) ? this.audio.duration : 0;
  }

  getProgress() {
    if (!this.audio || isNaN(this.audio.duration) || this.audio.duration === 0)
      return 0;
    return (this.audio.currentTime / this.audio.duration) * 100;
  }

  notifyStateChange() {
    this.onStateChangeCallbacks.forEach((callback) =>
      callback({
        isPlaying: this.isPlaying,
        currentSongId: this.currentSongId,
        currentTime: this.getCurrentTime(),
        duration: this.getDuration(),
        progress: this.getProgress(),
      })
    );
  }

  onStateChange(callback) {
    this.onStateChangeCallbacks.push(callback);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  onTimeUpdate(callback) {
    this.onTimeUpdateCallbacks.push(callback);
    return () => {
      this.onTimeUpdateCallbacks = this.onTimeUpdateCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  onLoadedMetadata(callback) {
    this.onLoadedMetadataCallbacks.push(callback);
    return () => {
      this.onLoadedMetadataCallbacks = this.onLoadedMetadataCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  onEnded(callback) {
    this.onEndedCallbacks.push(callback);
    return () => {
      this.onEndedCallbacks = this.onEndedCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }
}

export const audioService = new AudioService();
