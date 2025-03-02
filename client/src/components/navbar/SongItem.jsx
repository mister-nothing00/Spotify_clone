import React, { memo, useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { UserData } from "../../hook/context/User";
import { SongData } from "../../hook/context/Song";
import { Box, IconButton, Image, Text, Flex } from "@chakra-ui/react";

function SongItem({ image, name, desc, id }) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { addToPlaylist, user } = UserData();
  const { setSelectedSong, setIsPlaying } = SongData();

  const playList = user.playlist;

  useEffect(() => {
    if (playList && playList.includes(id)) {
      setSaved(true);
    }
  }, [user]);

  const savetoPlaylistHandler = (e) => {
    e.stopPropagation(); // Evita che il click si propaghi e faccia partire la canzone
    setSaved(!saved);
    addToPlaylist(id);
  };

  const playSongHandler = () => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  return (
    <Box
      position="relative"
      borderRadius="md"
      overflow="hidden"
      transition="all 0.3s ease"
      transform={hovered ? "translateY(-8px)" : "none"}
      cursor="pointer"
      bg="rgba(255,255,255,0.03)"
      onClick={playSongHandler}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      height="100%"
      mb={6}  /* Margine inferiore aumentato */
      boxShadow="0 4px 12px rgba(0,0,0,0.2)"
    >
      {/* Contenitore dell'immagine con effetto hover */}
      <Box 
        position="relative" 
        width="100%" 
        paddingBottom="100%" 
        overflow="hidden"
        borderRadius="md"
        boxShadow={hovered ? "0 16px 24px rgba(0,0,0,0.4)" : "0 8px 16px rgba(0,0,0,0.2)"}
        transition="all 0.3s ease"
      >
        <Image 
          src={image || "https://via.placeholder.com/250"} 
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          alt={name}
          filter={hovered ? "brightness(0.7)" : "brightness(1)"}
          transition="all 0.3s ease"
        />
        
        {/* Overlay con pulsanti in hover */}
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          align="center"
          justify="center"
          opacity={hovered ? "1" : "0"}
          transition="opacity 0.3s ease"
        >
          <IconButton
            aria-label="Play song"
            icon={<FaPlay />}
            size="md"
            borderRadius="full"
            bg="#1DB954"
            color="black"
            _hover={{ transform: "scale(1.1)", bg: "#1ED760" }}
            boxShadow="0 4px 12px rgba(0,0,0,0.3)"
            onClick={playSongHandler}
            zIndex="2"
          />
        </Flex>
        
        {/* Pulsante salva playlist */}
        <IconButton
          aria-label={saved ? "Remove from playlist" : "Add to playlist"}
          icon={saved ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
          size="sm"
          position="absolute"
          top="8px"
          right="8px"
          borderRadius="full"
          bg="rgba(0,0,0,0.6)"
          color={saved ? "#1DB954" : "white"}
          opacity={hovered ? "1" : "0"}
          transform={hovered ? "translateY(0)" : "translateY(-8px)"}
          transition="all 0.2s ease"
          _hover={{ bg: "rgba(0,0,0,0.8)" }}
          onClick={savetoPlaylistHandler}
          zIndex="2"
        />
      </Box>
      
      {/* Informazioni della canzone */}
      <Box p={3}>
        <Text 
          fontWeight="600" 
          fontSize="md" 
          mb={1}
          noOfLines={1}
          color="white"
        >
          {name}
        </Text>
        <Text 
          fontSize="sm" 
          color="whiteAlpha.700"
          noOfLines={1}
        >
          {desc}
        </Text>
      </Box>
    </Box>
  );
}

export default memo(SongItem);