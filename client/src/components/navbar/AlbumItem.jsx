import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlbumItem({ image, name, desc, id }) {
  const navigate = useNavigate();

  return (
    <>
      <Box
        onClick={() => navigate("/album/" + id)}
        minWidth={"180px"}
        p={2}
        px={3}
        rounded={"lg"}
        cursor={"pointer"}
        _hover={{ bg: "#ffffff26" }} overflowX={"auto"}
      >
        <Box  position={"relative"} width={"100%"}>
        <Image src={image} rounded={"lg"} w={"160px"} alt=""/>
        <Text fontFamily={"Poppins"} fontWeight={"semibold"} mt={2} mb={1}>
          {name.slice(0, 12)}..
        </Text>
        <Text fontSize={"sm"}>{desc.slice(0, 18)}..</Text>
        </Box>
      </Box>
    </>
  );
}
