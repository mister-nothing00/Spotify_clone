import React, { memo, useEffect, useState } from "react";
import Layout from "../components/navbar/Layout";
import { SongData } from "../hook/context/Song";
import { Box, Divider, Flex, Grid, Heading, IconButton, Image, Text, Badge } from "@chakra-ui/react";
import { UserData } from "../hook/context/User";
import Logo from "../assets/logo.png";
import { FaBookmark, FaPlay, FaClock } from "react-icons/fa";
import { RiPlayListLine } from "react-icons/ri";

function PlayList({ user }) {
  const { songs, setSelectedSong, setIsPlaying } = SongData();

  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    if (songs && user && Array.isArray(user.playlist)) {
      const filteredSongs = songs.filter((e) =>
        user.playlist.includes(e._id.toString())
      );
      setMyPlaylist(filteredSongs);
    }
  }, [songs, user]);

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
      {/* Header della playlist con gradiente */}
      <Box 
        bgGradient="linear(to-b, #1DB954, rgba(18,18,18,0.9))"
        py={6}
        px={4}
        borderRadius="md"
        mb={6}
      >
        <Flex
          gap={8}
          alignItems={{ base: "center", md: "flex-end" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          {/* Immagine della playlist o placeholder */}
          <Box
            minWidth={{ base: "180px", md: "220px" }}
            height={{ base: "180px", md: "220px" }}
            bg="rgba(0,0,0,0.2)"
            borderRadius="md"
            overflow="hidden"
            boxShadow="2xl"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {myPlaylist && myPlaylist[0] ? (
              <Image
                src={myPlaylist[0].thumbnail.url}
                alt="playlist cover"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            ) : (
              <RiPlayListLine size={80} color="#5E5E5E" />
            )}
          </Box>

          {/* Informazioni della playlist */}
          <Flex 
            flexDirection="column" 
            justifyContent={{ md: "flex-end" }}
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
              mb={2}
              letterSpacing="-0.02em"
            >
              {user.name}'s Playlist
            </Heading>
            
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              fontWeight="medium"
              mb={4}
            >
              Your favorite songs
            </Text>
            
            <Flex align="center" gap={2}>
              <Image
                src={Logo}
                boxSize="24px"
                alt=""
              />
              <Text fontWeight="medium" fontSize="sm">
                {myPlaylist.length} songs
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* Lista delle canzoni */}
      <Box px={4} borderRadius="md" overflow="hidden">
        {/* Intestazione tabella */}
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
          mb={2}
        >
          <Text fontSize="sm" fontWeight="medium">#</Text>
          <Text fontSize="sm" fontWeight="medium">Title</Text>
          <Text fontSize="sm" fontWeight="medium" display={{ base: "none", md: "block" }}>Artist</Text>
          <Text fontSize="sm" fontWeight="medium" display={{ base: "none", md: "block" }}>
            <FaClock size={14} />
          </Text>
          <Box></Box>
        </Grid>

        {/* Messaggio se non ci sono canzoni */}
        {myPlaylist.length === 0 && (
          <Flex 
            direction="column" 
            align="center" 
            justify="center" 
            py={10} 
            bg="rgba(255,255,255,0.02)"
            borderRadius="md"
          >
            <RiPlayListLine size={60} color="#5E5E5E" />
            <Text 
              fontSize="lg" 
              fontWeight="medium" 
              mt={4} 
              color="whiteAlpha.800"
            >
              Your playlist is empty
            </Text>
            <Text fontSize="sm" color="whiteAlpha.600" mt={2}>
              Add songs to your playlist to see them here
            </Text>
          </Flex>
        )}

        {/* Lista canzoni */}
        {myPlaylist.map((e, i) => (
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
    </Layout>
  );
}

export default memo(PlayList);