import React, { memo } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Player from "./Player.jsx";

function Layout({ children }) {
  return (
    <>
      <Box background={"blackAlpha.900"} color={"white"} height="100vh">
        <Box display={"flex"} width={"100%"} height={"100%"}>
          <Sidebar />
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            paddingRight={4}
            width={"100%"}
            overflow={"auto"}
          >
            <header>
              <Navbar />
            </header>
            {children}
          </Box>
        </Box>
        <Player />
      </Box>
    </>
  );
}

export default memo(Layout);
