import React, { memo, useEffect } from "react";
import Layout from "../components/navbar/Layout";
import { SongData } from "../hook/context/Song";
import { useParams } from "react-router-dom";
import { UserData } from "../hook/context/User";
import { FaBookmark, FaPlay, FaClock } from "react-icons/fa";
import Logo from "../assets/logo.png";

import {
  Box,
  Image,
  Text,
  Heading,
  Flex,
  Grid,
  Divider,
  IconButton,
  Badge,
} from "@chakra-ui/react";

const Album = () => {
  const {
    fetchAlbumSong,
    albumSong,
    albumData,
    setIsPlaying,
    setSelectedSong,
  } = SongData();

  const params = useParams();

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [params.id]);

  const onclickHander = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const { addToPlaylist } = UserData();

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  };

  return (
    <Layout>
      {albumData && (
        <>
          {/* Album Header con sfondo sfumato */}
          <Box 
            bgGradient="linear(to-b, rgba(18,18,18,0.8), rgba(0,0,0,0.9))"
            py={6}
            px={4}
            borderRadius="md"
            mb={6}
          >
            <Flex
              gap={8}
              flexDirection={{ base: "column", md: "row" }}
              alignItems={{ base: "center", md: "flex-start" }}
            >
              {/* Immagine dell'album con ombra */}
              <Box
                minWidth={{ base: "180px", md: "220px" }}
                height={{ base: "180px", md: "220px" }}
                boxShadow="2xl"
                borderRadius="md"
                overflow="hidden"
              >
                {albumData.thumbnail && (
                  <Image
                    src={albumData.thumbnail.url}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt={albumData.title}
                    transition="transform 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                )}
              </Box>

              {/* Informazioni dell'album */}
              <Flex 
                flexDirection="column" 
                justifyContent="flex-end"
                height={{ md: "220px" }}
              >
                <Badge 
                  colorScheme="gray" 
                  bg="rgba(255,255,255,0.1)" 
                  color="white" 
                  mb={2}
                  borderRadius="full"
                  px={3}
                  py={1}
                  width="fit-content"
                >
                  Playlist
                </Badge>
                
                <Heading 
                  as="h1" 
                  fontSize={{ base: "3xl", md: "5xl" }} 
                  fontWeight="bold"
                  mb={4}
                  letterSpacing="-0.02em"
                >
                  {albumData.title}
                </Heading>
                
                <Text 
                  fontSize="md" 
                  color="whiteAlpha.800" 
                  mb={4}
                  maxW="700px"
                >
                  {albumData.description}
                </Text>
                
                <Flex align="center" gap={2}>
                  <Image
                    src={Logo}
                    boxSize="24px"
                    alt=""
                  />
                  <Text fontWeight="medium" fontSize="sm">
                    {albumSong && albumSong.length} songs
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>

          {/* Intestazione tabella */}
          <Box px={4} borderRadius="md" overflow="hidden">
            <Grid
              templateColumns={{ 
                base: "40px 1fr auto",
                md: "40px 3fr 2fr 1fr auto" 
              }}
              gap={4}
              py={2}
              px={3}
              bg="rgba(255,255,255,0.03)"
              alignItems="center"
              borderRadius="md"
              color="whiteAlpha.600"
            >
              <Text fontSize="sm" fontWeight="medium">#</Text>
              <Text fontSize="sm" fontWeight="medium">Title</Text>
              <Text fontSize="sm" fontWeight="medium" display={{ base: "none", md: "block" }}>Artist</Text>
              <Text fontSize="sm" fontWeight="medium" display={{ base: "none", md: "block" }}>
                <FaClock size={14} />
              </Text>
              <Box></Box>
            </Grid>

            {/* Lista canzoni */}
            {albumSong &&
              albumSong.map((e, i) => (
                <Grid
                  key={i}
                  templateColumns={{ 
                    base: "40px 1fr auto",
                    md: "40px 3fr 2fr 1fr auto" 
                  }}
                  gap={4}
                  py={3}
                  px={3}
                  color="whiteAlpha.800"
                  borderRadius="md"
                  _hover={{ bg: "rgba(255,255,255,0.1)" }}
                  transition="all 0.2s"
                  alignItems="center"
                  mb={1}
                >
                  {/* Numero */}
                  <Text 
                    fontSize="sm" 
                    color="whiteAlpha.600"
                    fontWeight="medium"
                  >
                    {i + 1}
                  </Text>
                  
                  {/* Titolo con immagine */}
                  <Flex 
                    align="center" 
                    gap={3} 
                    _hover={{ color: "#1DB954" }}
                    transition="color 0.2s"
                    cursor="pointer"
                    onClick={() => onclickHander(e._id)}
                  >
                    <Image
                      src={e.thumbnail.url}
                      boxSize="40px"
                      borderRadius="sm"
                      objectFit="cover"
                      alt=""
                    />
                    <Box>
                      <Text fontWeight="medium" fontSize="md" noOfLines={1}>
                        {e.title}
                      </Text>
                    </Box>
                  </Flex>
                  
                  {/* Artista */}
                  <Text 
                    fontSize="sm" 
                    color="whiteAlpha.700" 
                    display={{ base: "none", md: "block" }}
                    noOfLines={1}
                  >
                    {e.singer}
                  </Text>
                  
                  {/* Durata (simulata) */}
                  <Text 
                    fontSize="sm" 
                    color="whiteAlpha.700"
                    display={{ base: "none", md: "block" }}
                  >
                    3:24
                  </Text>
                  
                  {/* Pulsanti azione */}
                  <Flex justify="flex-end" align="center" gap={2}>
                    <IconButton
                      aria-label="Save to Playlist"
                      icon={<FaBookmark size={16} />}
                      variant="ghost"
                      size="sm"
                      color="whiteAlpha.700"
                      _hover={{ color: "#1DB954", bg: "transparent" }}
                      onClick={() => savePlayListHandler(e._id)}
                    />
                    <IconButton
                      aria-label="Play"
                      icon={<FaPlay size={16} />}
                      variant="ghost"
                      size="sm"
                      color="whiteAlpha.900"
                      _hover={{ color: "#1DB954", bg: "transparent" }}
                      onClick={() => onclickHander(e._id)}
                    />
                  </Flex>
                </Grid>
              ))}
          </Box>
        </>
      )}
    </Layout>
  );
};

export default memo(Album);