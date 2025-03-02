import { Box, Image, Text, Flex } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

function AlbumItem({ image, name, desc, id }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onClick={() => navigate("/album/" + id)}
      width="100%"
      borderRadius="md"
      overflow="hidden"
      transition="all 0.3s ease"
      transform={isHovered ? "translateY(-8px)" : "none"}
      cursor="pointer"
      bg="rgba(255,255,255,0.03)"
      role="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
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
        boxShadow={isHovered ? "0 16px 24px rgba(0,0,0,0.4)" : "0 8px 16px rgba(0,0,0,0.2)"}
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
          filter={isHovered ? "brightness(0.7)" : "brightness(1)"}
          transition="all 0.3s ease"
        />
        
        {/* Pulsante play che appare in hover */}
        <Flex
          position="absolute"
          bottom="8px"
          right="8px"
          width="40px"
          height="40px"
          borderRadius="full"
          bg="#1DB954"
          justify="center"
          align="center"
          opacity={isHovered ? "1" : "0"}
          transform={isHovered ? "translateY(0)" : "translateY(8px)"}
          transition="all 0.2s ease"
          boxShadow="0 4px 12px rgba(0,0,0,0.5)"
          color="black"
        >
          <FaPlay size={15} />
        </Flex>
      </Box>
      
      {/* Informazioni dell'album */}
      <Box p={3}>
        <Text 
          fontWeight="600" 
          fontSize="md" 
          mb={1}
          noOfLines={1}
          color="white"
          transition="color 0.2s ease"
          _groupHover={{ color: "#1DB954" }}
        >
          {name}
        </Text>
        <Text 
          fontSize="sm" 
          color="whiteAlpha.700"
          noOfLines={2}
          lineHeight="1.3"
        >
          {desc}
        </Text>
      </Box>
    </Box>
  );
}

export default memo(AlbumItem);