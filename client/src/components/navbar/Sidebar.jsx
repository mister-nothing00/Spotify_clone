import React, { memo } from "react";
import { Box, Button, Divider, Link, Text } from "@chakra-ui/react";
import { IoHome, IoSearch } from "react-icons/io5";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { LuPlusCircle } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import PlayListCard from "./PlayListCard.jsx";

function Sidebar() {
  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        position="sticky"
        width={"240px"}
        p={4}
        bg={"black"}
        py={10}
        height={"100%"}
        boxShadow={"lg"}
      >
        <Box
          background={"gray.900"}
          borderRadius={"8px"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          alignContent={"center"}
          width={"90%"}
          mb={8}
          p={2}
        >
          <Link
            as={RouterLink}
            to={"/"}
            display={"flex"}
            alignItems={"center"}
            _hover={{ textDecoration: "none" }}
          >
            <IoHome size={20} />
            <Text fontFamily={"Poppins"} fontSize={"xs"} ms={2}>
              Home
            </Text>
          </Link>

          <Box display={"flex"} alignItems={"center"} mt={5}>
            <IoSearch size={20} />
            <Text
              fontFamily={"Poppins"}
              fontSize={"xs"}
              ms={2}
              _hover={{ textDecoration: "none" }}
            >
              Search
            </Text>
          </Box>
        </Box>

        {/* CONTENUTO FIGLIO* */}
        <Box
          bg={"gray.900"}
          rounded={"2xl"}
          py={4}
          px={2}
          me={2}
          overflowY={"hidden"}
          width={"90%"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
            width={"100%"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <MdOutlineLibraryMusic size={20} />
              <Text
                display={{ base: "none", md: "block" }}
                fontFamily={"Poppins"}
                fontWeight={"semibold"}
                fontSize={"sm"}
                ms={1}
              >
                Your Library
              </Text>
            </Box>
          </Box>
          <Divider opacity={0.1} bg={"gray.100"} my={1} />

          <Link
            as={RouterLink}
            to={"/playlist"}
            fontFamily={"Poppins"}
            fontSize={"xs"}
            _hover={{ textDecoration: "none", fontWeight: "medium" }}
          >
            <PlayListCard />
          </Link>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={5}
            my={8}
          >
            <Text
              fontFamily={"Poppins"}
              fontWeight={"medium"}
              fontSize={"md"}
              width={"100%"}
              textAlign={"center"}
            >
              Let's find some podcasts to follow
            </Text>
            <Text
              fontWeight={"light"}
              fontSize={"2xs"}
              textAlign={"center"}
              width={"100%"}
            >
              We'll keep you updated on new episodes
            </Text>
            <Button
              px={"10px"}
              py={2}
              size={"sm"}
              width={{ base: "100%", md: "auto" }}
              mx={"0"}
              borderRadius={"16px"}
            >
              <Text width={"100%"} textAlign={"center"}>
                Browse Podcasts
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default memo(Sidebar);
