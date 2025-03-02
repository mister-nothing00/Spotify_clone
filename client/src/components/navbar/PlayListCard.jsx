import { Box, Heading, } from "@chakra-ui/react";
import React, { memo } from "react";


function PlayListCard() {
 
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={4}
        mt={2}
        rounded={"lg"}
        boxShadow={"lg"}
        cursor={"pointer"}
        _hover={{ background: "#ffffff26", textDecoration: "none" }}
        bg={"whiteAlpha.100"}
        width={"100%"}
      >
        <Heading fontSize={"sm"} >
          My Playlist
        </Heading>
       
      </Box>
    </>
  );
}

export default memo(PlayListCard);
