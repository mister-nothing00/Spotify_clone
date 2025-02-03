import { Box, Image, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

 function AlbumItem({ image, name, desc, id }) {
  const navigate = useNavigate();

  return (
    <>
      <Box
        onClick={() => navigate("/album/" + id)}
        width={"100%"}
        p={3}
        rounded={"lg"}
        cursor={"pointer"}
        _hover={{ bg: "#ffffff26" }}
        overflowX={"auto"}
      >
        <Box position={"relative"} width={"100%"}>
          <Image src={image} rounded={"lg"} w={"200px"} alt="" />
          <Text fontFamily={"Poppins"} fontWeight={"semibold"} mt={2} mb={1}>
            {name.slice(0, 12)}..
          </Text>
          <Text fontSize={"sm"}>{desc.slice(0, 18)}..</Text>
        </Box>
      </Box>
    </>
  );
}

export default memo(AlbumItem);