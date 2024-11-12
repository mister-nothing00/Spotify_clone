import React, { useEffect } from "react";
import Layout from "../components/navbar/Layout";
import { SongData } from "../hook/context/Song";
import { useParams } from "react-router-dom";
import { UserData } from "../hook/context/User";
import { FaBookmark, FaPlay } from "react-icons/fa";
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
          <Flex
            mt={10}
            gap={8}
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
            ps={3}
          >
            {albumData.thumbnail && (
              <Image
                src={albumData.thumbnail.url}
                boxSize="192px"
                borderRadius="md"
                alt=""
              />
            )}

            <Flex flexDirection="column">
              <Text>Playlist</Text>
              <Heading as="h2" size="2xl" mb={4} fontWeight="bold">
                {albumData.title} PlayList
              </Heading>
              <Text>{albumData.description}</Text>
              <Box mt={1}>
                <Image
                  src={Logo}
                  boxSize="24px"
                  display="inline-block"
                  alt=""
                />
              </Box>
            </Flex>
          </Flex>

          <Grid
            templateColumns={{ base: "repeat(3, 1fr)", sm: "repeat(4, 1fr)" }}
            mt={10}
            mb={4}
            pl={2}
            color="#a7a7a7"
          >
            <Text>
              <b className="mr-4">#</b>
            </Text>
            <Text>Artist</Text>
            <Text display={{ base: "none", sm: "block" }}>Description</Text>
            <Text textAlign="center">Actions</Text>
          </Grid>

          <Divider />
          {albumSong &&
            albumSong.map((e, i) => (
              <Grid
                templateColumns={{ base: "repeat(3, 1fr)", sm: "repeat(4, 1fr)" }}
                mt={10}
                mb={4}
                pl={2}
                color="#a7a7a7"
                _hover={{ bg: "#ffffff2b" }}
                cursor="pointer"
                key={i}
              >
                <Flex alignItems="center" color="white">
                  <b className="mr-4" style={{ color: '#a7a7a7' }}>{i + 1}</b>
                  <Image
                    src={e.thumbnail.url}
                    boxSize="40px"
                    mr={5}
                    alt=""
                  />
                  <Text>{e.title}</Text>
                </Flex>
                <Text fontSize="15px">{e.singer}</Text>
                <Text fontSize="15px" display={{ base: "none", sm: "block" }}>
                  {e.singer.slice(0, 20)}...
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
        </>
      )}
    </Layout>
  );
};

export default Album;