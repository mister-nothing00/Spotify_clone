import React, { useEffect, useState } from "react";
import Layout from "../components/navbar/Layout";
import { SongData } from "../hook/context/Song";
import { Box, Divider, Flex, Grid, Heading, IconButton, Image, Text } from "@chakra-ui/react";
import { UserData } from "../hook/context/User";
import Logo from "../assets/logo.png";
import { FaBookmark, FaPlay } from "react-icons/fa";

export default function PlayList({ user }) {
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
    <>
      <Layout>
        <Box
          display={"flex"}
          gap={8}
          mt={10}
          flexDirection={{ base: "row", md: "row" }}
          alignItems={{ base: "center", md: "center" }}
          ps={3}
        >
          {myPlaylist && myPlaylist[0] ? (
            <Image
              src={myPlaylist[0].thumbnail.url}
              alt="playlist image"
              width={"150px"}
              rounded={"md"}
            />
          ) : (
            <Image src="https://via.placeholder.com/250" alt=""  width={"150px"}/>
          )}

          <Box
            fontFamily={"Poppins"}
            display={"flex"}
            flexDirection={"column"}
            gap={1}
          >
            <Text fontSize={"2xl"}>Playlist</Text>
            <Heading
              fontSize={{ base: "4xl", md: "4xl" }}
              fontWeight={"semibold"}
            >
              {user.name} || Playlist
            </Heading>
            <Heading fontSize={"xl"} fontWeight={"normal"}>
              Your favorate songs
            </Heading>
            <Text mt={1}>
              <Image src={Logo} display={"inline-block"} w={6} alt="" />
            </Text>
          </Box>
        </Box>

        <Grid templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }} mt={10} mb={4} pl={2} color="#a7a7a7">
        <Text>
          <b className="mr-4">#</b>
        </Text>
        <Text>Artist</Text>
        <Text display={{ base: 'none', sm: 'block' }}>Title</Text>
        <Text textAlign="center">Actions</Text>
      </Grid>
      <Divider />
      {myPlaylist &&
        myPlaylist.map((e, i) => (
          <Grid
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }}
            mt={10}
            mb={4}
            pl={2}
            color="#a7a7a7"
            _hover={{ bg: '#ffffff2b' }}
            cursor="pointer"
            p={4}
            key={i}
          >
            <Flex alignItems="center" color="white">
              <b className="mr-4" style={{ color: '#a7a7a7' }}>{i + 1}</b>
              <Image src={e.thumbnail.url} boxSize="40px" mr={5} alt="" />
              <Text>{e.title}</Text>
            </Flex>
            <Text fontSize="15px">{e.singer}</Text>
            <Text fontSize="15px" display={{ base: 'none', sm: 'block' }}>
              {e.title.slice(0, 20)}...
            </Text>
            <Flex justifyContent="center" alignItems="center" gap={5}>
              <IconButton
                aria-label="Save Playlist"
                icon={<FaBookmark />}
                variant="link"
                fontSize="15px"
                onClick={() => savePlayListHandler(e._id)}
              />
              <IconButton
                aria-label="Play"
                icon={<FaPlay />}
                variant="link"
                fontSize="15px"
                onClick={() => onclickHander(e._id)}
              />
            </Flex>
          </Grid>
        ))}
      </Layout>
    </>
  );
}
