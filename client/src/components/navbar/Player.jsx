import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../../hook/context/Song";
import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

export default function Player() {
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

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;
    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);


  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <>
      {song && (
        <Box
          bg={"black"}
          display={"flex"}
          alignItems={"center"}
          color={"white"}
          px={4}
          py={2}
          width={"100%"}
          boxShadow={"md"}
        >
          {/* Parte sinistra con immagine, titolo e cantante */}
          <Box display={"flex"} alignItems={"center"} gap={4} width={"30%"}>
            <Image
              src={
                song.thumbnail
                  ? song.thumbnail.url
                  : "http://via.placeholder.com/50"
              }
              alt="song--image"
              width={"60px"}
              borderRadius={"10px"}
            />
            <Box fontFamily={"Poppins"}>
              <Text fontSize={"md"} fontWeight={"semibold"}>
                {song.title}
              </Text>
              <Text fontSize={"xs"} color={"gray.400"}>
                {song.singer}
              </Text>
            </Box>
          </Box>

          {/* Parte centrale con controlli audio */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"40%"}
          >
             {song && song.audio && (
              <>
                {isPlaying ? (
                  <audio ref={audioRef} src={song.audio.url} autoPlay />
                ) : (
                  <audio ref={audioRef} src={song.audio.url} />
                )}
              </>
            )}
            <Input
              type="range"
              min={0}
              max={100}
              width={"100%"}
              my={2}
              border={"none"}
              borderRadius={"8px"}
              css={{
                appearance: "none",
                height: "8px",
                "&::-webkit-slider-thumb": {
                  appearance: "none",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "lightgray",
                  borderRadius: "50%",
                  cursor: "pointer",
                  marginTop: "-6px",
                },
                "&::-webkit-slider-runnable-track": {
                  height: "8px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "&::-moz-range-thumb": {
                  width: "20px",
                  height: "20px",
                  backgroundColor: "lightgray",
                  borderRadius: "50%",
                  cursor: "pointer",
                },
                "&::-moz-range-track": {
                  height: "8px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "&::-ms-thumb": {
                  width: "20px",
                  height: "20px",
                  backgroundColor: "lightgray",
                  borderRadius: "50%",
                  cursor: "pointer",
                },
                "&::-ms-track": {
                  height: "8px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  border: "none",
                },
              }}
              value={(progress / duration) * 100}
              onChange={handleProgressChange}
            />
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
              width={"100%"}
            >
              <Button
                size={"sm"}
                border={"none"}
                bg="transparent"
                onClick={prevMusic}
              >
                <GrChapterPrevious size={24} />
              </Button>
              <Button
                size={"sm"}
                border={"none"}
                bg="transparent"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
              </Button>
              <Button
                size={"sm"}
                border={"none"}
                bg="transparent"
                onClick={nextMusic}
              >
                <GrChapterNext size={24} />
              </Button>
            </Box>
          </Box>

          <Box display={"flex"} alignItems={"center"} width={"auto"} ml="auto">
            <Input
              type="range"
              width={{ base: "16px", md: "32px" }}
              min={"0"}
              max={"1"}
              step={"0.01"}
              value={volume}
              onChange={handleVolumeChange}
              css={{
                appearance: "none",
                height: "8px",
                "&::-webkit-slider-thumb": {
                  appearance: "none",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "lightgray",
                  borderRadius: "50%",
                  cursor: "pointer",
                },
                "&::-webkit-slider-runnable-track": {
                  height: "8px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "&::-moz-range-thumb": {
                  width: "20px",
                  height: "20px",
                  backgroundColor: "lightgray",
                  borderRadius: "50%",
                  cursor: "pointer",
                },
                "&::-moz-range-track": {
                  height: "8px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "&::-ms-thumb": {
                  width: "20px",
                  height: "20px",
                  backgroundColor: "lightgray",
                  borderRadius: "50%",
                  cursor: "pointer",
                },
                "&::-ms-track": {
                  height: "8px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  border: "none",
                },
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
