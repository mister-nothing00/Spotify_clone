import React, { memo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Player from "./Player.jsx";

function Layout({ children }) {
  return (
    <Box
      bg="linear-gradient(180deg, #121212 0%, #000000 100%)"
      color="white"
      minH="100vh"
      overflowX="hidden"
    >
      <Flex height="calc(100vh - 70px)">
      
        {/* 70px è l'altezza del Player */}
        {/* Sidebar */}
        <Sidebar />
        {/* Contenuto principale */}
        <Flex direction="column" flex="1" overflow="hidden">
          {/* Navbar */}
          <Navbar />

          {/* Contenuto senza scrollbar visibile */}
          <Box
            overflowY="auto"
            flex="1"
            px={{ base: 2, md: 4 }}
            py={4}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },

              msOverflowStyle: "none" /* IE e Edge */,
              scrollbarWidth: "none" /* Firefox */,
            }}
          >
            {children}

            <Box height="80px" />
          </Box>
        </Flex>
        
      </Flex>

      {/* Player fisso in basso */}
      <Player />
    </Box>
  );
}

export default memo(Layout);
