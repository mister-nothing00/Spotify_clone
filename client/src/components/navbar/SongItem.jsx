import React, { memo, useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { UserData } from "../../hook/context/User";
import { SongData } from "../../hook/context/Song";
import { Box, IconButton, Image, Text, VStack, Flex } from "@chakra-ui/react";

function SongItem({ image, name, desc, id }) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { addToPlaylist, user } = UserData();
  const { setSelectedSong, setIsPlaying } = SongData();

  useEffect(() => {
    setSaved(user.playlist?.includes(id) || false);
  }, [user.playlist, id]);

  const handlePlaySong = () => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const saveToPlaylistHandler = () => {
    setSaved(!saved);
    addToPlaylist(id);
  };

  return (
    <Box
      as="article"
      minW="180px"
      maxW="200px"
      p={2}
      rounded="lg"
      transition="background 0.3s ease"
      _hover={{ 
        bg: "rgba(255, 255, 255, 0.15)", 
        transform: "scale(1.02)"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      position="relative"
      boxShadow="md"
      marginBottom={20}
    >
      <VStack spacing={2} align="stretch">
        <Box position="relative" overflow="hidden" rounded="lg">
          <Image 
            src={image} 
            alt={name} 
            rounded="lg" 
            objectFit="cover" 
            w="full" 
            h="160px"
          />
          
          {/* Overlay buttons */}
          <Flex 
            position="absolute" 
            bottom={2} 
            left={2} 
            right={2} 
            justifyContent="space-between"
            opacity={hovered ? 1 : 0}
            transition="opacity 0.3s ease"
          >
            <IconButton
              icon={<FaPlay />}
              aria-label="Play song"
              size="sm"
              colorScheme="green"
              rounded="full"
              onClick={handlePlaySong}
            />
            <IconButton
              icon={saved ? <FaBookmark /> : <FaRegBookmark />}
              aria-label="Save to playlist"
              size="sm"
              colorScheme="green"
              rounded="full"
              onClick={saveToPlaylistHandler}
            />
          </Flex>
        </Box>

        {/* Song details */}
        <VStack spacing={0} align="stretch">
          <Text 
            fontFamily="Poppins" 
            fontWeight="semibold" 
            fontSize="md" 
            noOfLines={1}
            color="white"
          >
            {name}
          </Text>
          <Text 
            fontFamily="Poppins" 
            fontWeight="normal" 
            fontSize="xs" 
            color="whiteAlpha.700"
            noOfLines={1}
          >
            {desc}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}

export default memo(SongItem);