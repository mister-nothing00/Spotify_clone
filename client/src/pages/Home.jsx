import { memo, useState, useEffect } from "react";
import Layout from "../components/navbar/Layout";
import { Box, Heading, Flex, Grid, Text } from "@chakra-ui/react";
import { SongData } from "../hook/context/Song";
import AlbumItem from "../components/navbar/AlbumItem";
import SongItem from "../components/navbar/SongItem";

function Home() {
  const { songs, albums } = SongData();

  return (
    <Box width="100%" overflowX="hidden">
      <Layout>
        {/* Sezione Albums */}
        <Box as="section" mb={16} px={4} pt={5}>
          <Flex justify="space-between" align="center" mb={8}>
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              letterSpacing="tight"
            >
              Featured Charts
            </Heading>
            <Text
              fontSize="sm"
              color="whiteAlpha.700"
              fontWeight="medium"
              cursor="pointer"
              _hover={{ color: "#1DB954" }}
              transition="color 0.2s"
            >
              Show all
            </Text>
          </Flex>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
              xl: "repeat(6, 1fr)",
            }}
            gap={6}
          >
            {albums.map((e, i) => (
              <AlbumItem
                key={i}
                image={e.thumbnail.url}
                name={e.title}
                desc={e.description}
                id={e._id}
              />
            ))}
          </Grid>
        </Box>

        {/* Sezione Canzoni */}
        <Box as="section" mb={16} px={4}>
          <Flex justify="space-between" align="center" mb={8}>
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              letterSpacing="tight"
            >
              Today's Biggest Hits
            </Heading>
            <Text
              fontSize="sm"
              color="whiteAlpha.700"
              fontWeight="medium"
              cursor="pointer"
              _hover={{ color: "#1DB954" }}
              transition="color 0.2s"
            >
              Show all
            </Text>
          </Flex>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
              xl: "repeat(6, 1fr)",
            }}
            gap={6}
          >
            {songs.map((e, i) => (
              <SongItem
                key={i}
                image={e.thumbnail.url}
                name={e.title}
                desc={e.singer}
                id={e._id}
              />
            ))}
          </Grid>
        </Box>

        {/* Sezione basata sui tuoi gusti */}
        <Box as="section" mb={16} px={4}>
          <Flex justify="space-between" align="center" mb={8}>
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              letterSpacing="tight"
            >
              Made For You
            </Heading>
            <Text
              fontSize="sm"
              color="whiteAlpha.700"
              fontWeight="medium"
              cursor="pointer"
              _hover={{ color: "#1DB954" }}
              transition="color 0.2s"
            >
              Show all
            </Text>
          </Flex>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
              xl: "repeat(6, 1fr)",
            }}
            gap={6}
          >
            {songs.slice(0, 6).map((e, i) => (
              <SongItem
                key={`suggested-${i}`}
                image={e.thumbnail.url}
                name={e.title}
                desc={e.singer}
                id={e._id}
              />
            ))}
          </Grid>
        </Box>
      </Layout>
    </Box>
  );
}

export default memo(Home);
