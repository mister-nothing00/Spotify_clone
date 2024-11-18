import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FaMusic } from "react-icons/fa";
import { UserData } from "../../hook/context/User";

export default function PlayListCard() {
  const { user } = UserData();

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        p={4}
        mt={2}
        rounded={"lg"}
        boxShadow={"lg"}
        cursor={"pointer"}
        _hover={{ background: "#ffffff26", textDecoration: "none" }}
        bg={"whiteAlpha.100"}
        width={"100%"}
      >
        <Heading fontSize={"sm"} display={"block"}>My Playlist</Heading>
        <Box display={"flex"} alignItems={"center"} width={"100%"}>
          <FaMusic />
          <Box
            ml={4}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text ps={1}>
              {user.name}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
