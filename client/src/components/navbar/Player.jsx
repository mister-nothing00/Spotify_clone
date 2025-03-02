import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { SongData } from "../../hook/context/Song";
import { 
  Box, 
  Button, 
  Image, 
  Input, 
  Text, 
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Tooltip
} from "@chakra-ui/react";
import { 
  GrChapterPrevious, 
  GrChapterNext 
} from "react-icons/gr";
import { 
  FaPause, 
  FaPlay, 
  FaVolumeUp, 
  FaVolumeMute 
} from "react-icons/fa";

function Player() {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextMusic,
    prevMusic,
  } = SongData();

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  // Fetch song when selected song changes
  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
      
      // Autoplay logic
      if (autoplay) {
        audio.play().catch(error => {
          console.error("Autoplay failed:", error);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      // Automatically play next song when current song ends
      if (autoplay) {
        nextMusic();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song, nextMusic, autoplay, setIsPlaying]);

  // Play/Pause handler
  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  // Volume handler
  const handleVolumeChange = useCallback((value) => {
    const audio = audioRef.current;
    setVolume(value);
    audio.volume = value;
    
    // Unmute when volume is increased
    if (value > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  // Mute/Unmute handler
  const handleMuteToggle = useCallback(() => {
    const audio = audioRef.current;
    if (isMuted) {
      // Unmute
      audio.volume = volume;
      setIsMuted(false);
    } else {
      // Mute
      audio.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // Progress change handler
  const handleProgressChange = useCallback((value) => {
    const audio = audioRef.current;
    const newTime = (value / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  }, [duration]);

  // Autoplay toggle handler
  const handleAutoplayToggle = () => {
    setAutoplay(!autoplay);
  };

  // Format time to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Render nothing if no song
  if (!song) return null;

  return (
    <Box
      bg="black"
      display="flex"
      alignItems="center"
      position="fixed"
      bottom={0}
      color="white"
      px={4}
      py={2}
      width="100%"
      boxShadow="md"
      zIndex={1000}
    >
      {/* Left Section: Song Info */}
      <Box display="flex" alignItems="center" gap={4} width="30%">
        <Image
          src={song.thumbnail?.url || "http://via.placeholder.com/50"}
          alt="song image"
          width="60px"
          borderRadius="10px"
        />
        <Box fontFamily="Poppins">
          <Text fontSize="md" fontWeight="semibold">
            {song.title}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {song.singer}
          </Text>
        </Box>
      </Box>

      {/* Center Section: Player Controls */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="40%"
      >
        {/* Audio Element */}
        {song?.audio && (
          <audio 
            ref={audioRef} 
            src={song.audio.url} 
            muted={isMuted}
          />
        )}

        {/* Progress Slider */}
        <Box width="100%" display="flex" alignItems="center" gap={2}>
          <Text fontSize="xs">
            {formatTime(progress)}
          </Text>
          <Slider
            flex={1}
            min={0}
            max={100}
            value={(progress / duration) * 100}
            onChange={handleProgressChange}
          >
            <SliderTrack>
              <SliderFilledTrack bg="green.400" />
            </SliderTrack>
            <SliderThumb boxSize={4} bg="white" />
          </Slider>
          <Text fontSize="xs">
            {formatTime(duration)}
          </Text>
        </Box>

        {/* Playback Controls */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          mt={2}
        >
          <IconButton
            icon={<GrChapterPrevious size={24} />}
            onClick={prevMusic}
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          />
          <IconButton
            icon={isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            onClick={handlePlayPause}
            variant="solid"
            colorScheme="green"
            borderRadius="full"
          />
          <IconButton
            icon={<GrChapterNext size={24} />}
            onClick={nextMusic}
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          />
        </Box>
      </Box>

      {/* Right Section: Volume and Autoplay Control */}
      <Box display="flex" alignItems="center" width="auto" ml="auto" gap={4}>
        {/* Autoplay Toggle */}
        <Tooltip 
          label={`Autoplay is ${autoplay ? 'On' : 'Off'}`} 
          aria-label="Autoplay toggle"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Text fontSize="xs">Autoplay</Text>
            <Switch
              isChecked={autoplay}
              onChange={handleAutoplayToggle}
              colorScheme="green"
            />
          </Box>
        </Tooltip>

        {/* Volume Control */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            onClick={handleMuteToggle}
            variant="ghost"
            color="white"
            size="sm"
          />
          <Slider
            width="100px"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          >
            <SliderTrack>
              <SliderFilledTrack bg="green.400" />
            </SliderTrack>
            <SliderThumb boxSize={4} bg="white" />
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Player);