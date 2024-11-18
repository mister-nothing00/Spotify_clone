import React from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Player from "./Player.jsx";

export default function Layout({ children }) {
  return (
    <>
      <Box background={"blackAlpha.900"} color={"white"} height="100%"  >
        <Box display={"flex"} width={"100%"} height={"90vh"}>
          <Sidebar />
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            paddingRight={4}
            width={"100%"}
            overflow={"auto"} 
          >
            <Navbar />
            {children}
          </Box>
        </Box>
        <Player/>
      </Box>
    </>
  );
}