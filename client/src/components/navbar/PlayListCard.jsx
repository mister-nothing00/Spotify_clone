import { Box, Heading, Text, Flex, Icon } from "@chakra-ui/react";
import React, { memo } from "react";
import { FaMusic, FaHeadphones } from "react-icons/fa";
import { RiPlayListLine } from "react-icons/ri";
import { UserData } from "../../hook/context/User";

function PlayListCard() {
  const { user } = UserData();

  return (
    <Flex
      direction="row"
      align="center"
      p={3}
      mt={2}
      borderRadius="md"
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{ 
        bg: "rgba(255,255,255,0.1)", 
        transform: "translateX(4px)"
      }}
      bg="rgba(255,255,255,0.05)"
      width="100%"
      gap={3}
    >
      <Flex
        width="40px"
        height="40px"
        borderRadius="md"
        bg="linear-gradient(135deg, #1DB954 0%, #1ED760 100%)"
        justify="center"
        align="center"
        flexShrink={0}
      >
        <Icon as={RiPlayListLine} color="black" boxSize={6} />
      </Flex>
      
      <Box>
        <Heading 
          fontSize="sm" 
          fontWeight="bold"
          mb={1}
        >
          My Playlist
        </Heading>
        <Text
          fontSize="xs"
          color="whiteAlpha.700"
        >
          {user?.name || "Your"} collection
        </Text>
      </Box>
    </Flex>
  );
}

export default memo(PlayListCard);