import React, { memo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Link,
  Text,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { IoHome, IoSearch } from "react-icons/io5";
import { MdOutlineLibraryMusic, MdClose } from "react-icons/md";
import { BiPodcast } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard.jsx";

function Sidebar() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setShowSearchInput(true);
  };

  const handleCloseSearch = () => {
    setShowSearchInput(false);
    setSearchQuery("");
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchInput(false);
    }
  };

  return (
    <Box
      display={{ base: "none", md: "block" }}
      position="sticky"
      top="0"
      width="240px"
      height="100%"
      bg="#000000"
      pt={4}
      pb={20}
      overflowY="auto"
      boxShadow="1px 0 10px rgba(0,0,0,0.3)"
      zIndex="20"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },

        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {/* Navigazione principale */}
      <Box
        bg="rgba(24,24,24,0.95)"
        borderRadius="md"
        mx={3}
        mb={5}
        overflow="hidden"
      >
        <Link
          as={RouterLink}
          to="/"
          display="flex"
          alignItems="center"
          p={3}
          transition="all 0.2s ease"
          _hover={{ bg: "rgba(255,255,255,0.1)", textDecoration: "none" }}
          borderLeft={
            window.location.pathname === "/"
              ? "3px solid #1DB954"
              : "3px solid transparent"
          }
          bg={
            window.location.pathname === "/"
              ? "rgba(255,255,255,0.05)"
              : "transparent"
          }
        >
          <Icon
            as={IoHome}
            boxSize={5}
            color={window.location.pathname === "/" ? "#1DB954" : "white"}
          />
          <Text
            ml={3}
            fontSize="sm"
            fontWeight={window.location.pathname === "/" ? "bold" : "medium"}
            color={window.location.pathname === "/" ? "#1DB954" : "white"}
          >
            Home
          </Text>
        </Link>

        {showSearchInput ? (
          <Box px={3} py={2} width={"full"}>
            <form onSubmit={handleSearch}>
              <InputGroup>
                <InputLeftElement>
                  <IoSearch color="gray" />
                </InputLeftElement>
                <Input
                  placeholder="Search YouTube..."
                  size="sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  pr="0"
                  borderRadius="full"
                  bg="rgba(255,255,255,0.1)"
                  border="none"
                  width={"full"}
                  _focus={{
                    outline: "none",
                    boxShadow: "none",
                    bg: "rgba(255,255,255,0.15)",
                  }}
                />
                <InputRightElement width="">
                  <Flex>
                    {/* Pulsante di ricerca */}
                    <Button
                      h="1.5rem"
                      size="xs"
                      bg="#1DB954"
                      color="black"
                      borderRadius="full"
                      mr={1}
                      onClick={handleSearch}
                    >
                      <FaArrowRight />
                    </Button>
                    {/* Pulsante di chiusura */}
                    <Button
                      h="1.5rem"
                      size="xs"
                      variant="ghost"
                      color="gray.400"
                      onClick={handleCloseSearch}
                    >
                      <MdClose />
                    </Button>
                  </Flex>
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
        ) : (
          <Link
            display="flex"
            alignItems="center"
            p={3}
            transition="all 0.2s ease"
            _hover={{ bg: "rgba(255,255,255,0.1)", textDecoration: "none" }}
            onClick={handleSearchClick}
            cursor="pointer"
          >
            <Icon as={IoSearch} boxSize={4} />
            <Text ml={3} fontSize="sm" fontWeight="medium">
              Search YouTube
            </Text>
          </Link>
        )}
      </Box>

      {/* Libreria */}
      <Box bg="rgba(24,24,24,0.95)" borderRadius="md" mx={3} overflow="hidden">
        <Flex align="center" justify="space-between" px={3} py={4}>
          <Flex align="center">
            <Icon as={MdOutlineLibraryMusic} boxSize={5} />
            <Text ml={3} fontSize="sm" fontWeight="bold">
              Your Library
            </Text>
          </Flex>
        </Flex>

        <Divider opacity={0.1} bg="gray.100" />

        {/* Playlist Card */}
        <Box px={2} py={2}>
          <Link
            as={RouterLink}
            to="/playlist"
            _hover={{ textDecoration: "none" }}
          >
            <PlayListCard />
          </Link>
        </Box>

        {/* Sezione Podcast */}
        <Box p={4} mt={4}>
          <Text fontSize="sm" fontWeight="bold" mb={3}>
            Discover Podcasts
          </Text>
          <Text fontSize="xs" color="whiteAlpha.700" mb={4}>
            We'll keep you updated on new episodes from shows you follow
          </Text>
          <Button
            leftIcon={<BiPodcast />}
            size="sm"
            width="100%"
            borderRadius="full"
            bg="#1DB954"
            color="black"
            fontWeight="bold"
            _hover={{ bg: "#1ED760", transform: "scale(1.02)" }}
            transition="all 0.2s"
          >
            Browse Podcasts
          </Button>
        </Box>

        {/* Link legali */}
        <Flex
          wrap="wrap"
          gap={2}
          fontSize="xs"
          color="whiteAlpha.600"
          p={4}
          mt={4}
        ></Flex>
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
