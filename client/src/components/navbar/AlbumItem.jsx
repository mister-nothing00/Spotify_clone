import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Image, 
  Text, 
  VStack 
} from "@chakra-ui/react";

function AlbumItem({ 
  image, 
  name, 
  desc, 
  id,
  onDelete // Optional delete handler
}) {
  const navigate = useNavigate();

  // Utility function to truncate text
  const truncateText = (text, maxLength) => 
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const handleAlbumClick = (e) => {
    // Check if the click was on a delete button or inside a delete area
    if (e.target.closest('[data-delete-area="true"]')) {
      return;
    }
    navigate(`/album/${id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent navigation
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Box
      as="article"
      width="100%"
      p={3}
      rounded="lg"
      cursor="pointer"
      transition="background 0.3s ease"
      _hover={{ 
        bg: "rgba(255, 255, 255, 0.15)",
        transform: "scale(1.02)"
      }}
      onClick={handleAlbumClick}
      role="button"
      aria-label={`View album: ${name}`}
      position="relative"
    >
      {onDelete && (
        <Box
          position="absolute"
          top={2}
          right={2}
          zIndex={10}
          data-delete-area="true"
        >
          <Text
            color="red.400"
            fontWeight="bold"
            cursor="pointer"
            onClick={handleDelete}
            _hover={{ color: "red.600" }}
          >
            ✕
          </Text>
        </Box>
      )}

      <VStack 
        spacing={2} 
        align="stretch" 
        width="100%"
      >
        <Box 
          position="relative" 
          width="100%" 
          overflow="hidden"
        >
          <Image 
            src={image} 
            alt={name}
            rounded="lg" 
            objectFit="cover"
            width="200px"
            height="200px"
            transition="transform 0.3s ease"
          />
        </Box>
        
        <VStack 
          spacing={1} 
          align="stretch" 
          width="100%"
        >
          <Text 
            fontFamily="Poppins" 
            fontWeight="semibold"
            fontSize="md"
            color="white"
            noOfLines={1}
          >
            {truncateText(name, 15)}
          </Text>
          <Text 
            fontSize="sm" 
            color="whiteAlpha.700"
            noOfLines={1}
          >
            {truncateText(desc, 20)}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}

export default memo(AlbumItem);