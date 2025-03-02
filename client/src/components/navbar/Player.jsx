import React, { memo, useEffect, useRef, useState } from "react";
import { SongData } from "../../hook/context/Song";
import { Box, IconButton, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Flex } from "@chakra-ui/react";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs";

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

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (val) => {
    const newVolume = val;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setPrevVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      if (audioRef.current) {
        audioRef.current.volume = prevVolume;
      }
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
      setIsMuted(true);
    }
  };

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;
    
    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
      
      // Formatta il tempo totale
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
      setTotalTime(`${minutes}:${seconds}`);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      
      // Formatta il tempo attuale
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
      setCurrentTime(`${minutes}:${seconds}`);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handleProgressChange = (val) => {
    const newTime = (val / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  return (
    <>
      {song && (
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          bg="#111111"
          borderTop="1px solid #282828"
          display="flex"
          alignItems="center"
          color="white"
          px={4}
          py={3}
          height="70px"
          zIndex="1000"
        >
          {/* Audio element nascosto */}
          {song.audio && (
            <audio 
              ref={audioRef} 
              src={song.audio.url} 
              autoPlay={isPlaying} 
            />
          )}

          <Flex align="center" justify="space-between" width="100%">
            {/* Sezione sinistra: Informazioni canzone */}
            <Flex align="center" width="30%" maxWidth="300px">
              <Image
                src={song.thumbnail ? song.thumbnail.url : "http://via.placeholder.com/50"}
                alt={song.title}
                width="50px"
                height="50px"
                objectFit="cover"
                borderRadius="4px"
                mr={3}
                boxShadow="0 4px 8px rgba(0,0,0,0.3)"
              />
              <Box maxWidth="calc(100% - 70px)" overflow="hidden">
                <Text 
                  fontSize="sm" 
                  fontWeight="600" 
                  noOfLines={1}
                  _hover={{ color: "#1DB954" }}
                  transition="color 0.2s"
                  cursor="pointer"
                >
                  {song.title}
                </Text>
                <Text 
                  fontSize="xs" 
                  color="whiteAlpha.700" 
                  noOfLines={1}
                  _hover={{ color: "whiteAlpha.900" }}
                  transition="color 0.2s"
                  cursor="pointer"
                >
                  {song.singer}
                </Text>
              </Box>
            </Flex>

            {/* Sezione centrale: Controlli player */}
            <Flex direction="column" width="40%" maxWidth="600px">
              {/* Controlli di riproduzione */}
              <Flex justify="center" align="center" mb={1}>
                <IconButton
                  aria-label="Previous song"
                  icon={<GrChapterPrevious size={16} />}
                  onClick={prevMusic}
                  size="sm"
                  variant="ghost"
                  color="white"
                  _hover={{ color: "#1DB954" }}
                  mr={3}
                />
                <IconButton
                  aria-label={isPlaying ? "Pause" : "Play"}
                  icon={isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                  onClick={handlePlayPause}
                  size="sm"
                  bg="#1DB954"
                  color="black"
                  borderRadius="full"
                  _hover={{ bg: "#1ED760", transform: "scale(1.05)" }}
                  mx={2}
                  transition="all 0.2s"
                />
                <IconButton
                  aria-label="Next song"
                  icon={<GrChapterNext size={16} />}
                  onClick={nextMusic}
                  size="sm"
                  variant="ghost"
                  color="white"
                  _hover={{ color: "#1DB954" }}
                  ml={3}
                />
              </Flex>
              
              {/* Barra di avanzamento */}
              <Flex align="center" width="100%">
                <Text fontSize="xs" color="whiteAlpha.700" width="35px" textAlign="right">
                  {currentTime}
                </Text>
                <Box flex="1" mx={2}>
                  <Slider
                    aria-label="song-progress"
                    value={(progress / duration) * 100 || 0}
                    onChange={handleProgressChange}
                    focusThumbOnChange={false}
                  >
                    <SliderTrack bg="rgba(255, 255, 255, 0.2)" height="4px">
                      <SliderFilledTrack bg="#1DB954" />
                    </SliderTrack>
                    <SliderThumb 
                      boxSize={3}
                      bg="#1DB954"
                      _focus={{ boxShadow: "none" }}
                    />
                  </Slider>
                </Box>
                <Text fontSize="xs" color="whiteAlpha.700" width="35px">
                  {totalTime}
                </Text>
              </Flex>
            </Flex>

            {/* Sezione destra: Controllo volume */}
            <Flex align="center" width="30%" maxWidth="200px" justify="flex-end">
              <IconButton
                aria-label={isMuted ? "Unmute" : "Mute"}
                icon={isMuted ? <BsVolumeMute size={18} /> : <BsVolumeUp size={18} />}
                onClick={toggleMute}
                size="sm"
                variant="ghost"
                color="white"
                _hover={{ color: "#1DB954" }}
                mr={2}
              />
              <Box width="80px">
                <Slider
                  aria-label="volume-control"
                  value={volume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handleVolumeChange}
                  focusThumbOnChange={false}
                >
                  <SliderTrack bg="rgba(255, 255, 255, 0.2)" height="4px">
                    <SliderFilledTrack bg="white" />
                  </SliderTrack>
                  <SliderThumb 
                    boxSize={3}
                    bg="white"
                    _focus={{ boxShadow: "none" }}
                  />
                </Slider>
              </Box>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default memo(Player);