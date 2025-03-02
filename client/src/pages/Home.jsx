import { memo } from "react";

import Layout from "../components/navbar/Layout";
import { Box, Heading } from "@chakra-ui/react";
import { SongData } from "../hook/context/Song";
import AlbumItem from "../components/navbar/AlbumItem";
import SongItem from "../components/navbar/SongItem";

function Home() {
  const { songs, albums } = SongData();

  return (
    <>
      <Box width={"100%"} overflow={"auto"}>
        <Layout>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            width={"100%"}
            gap={2}
            fontFamily={"Poppins"}
            mb={10}
            
          >
            <Heading fontSize={"lg"} px={3}>
              Featured Charts
            </Heading>
            <Box display={"flex"} gap={5} width={"100%"}>
              {albums.map((e, i) => (
                <AlbumItem
                  key={i}
                  image={e.thumbnail.url}
                  name={e.title}
                  desc={e.description}
                  id={e._id}
                />
              ))}
            </Box>
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={2} mb={4} ps={3}>
            <Heading fontSize={"lg"} px={3} mb={3}>
              Today's biggest hits
            </Heading>
            <Box
              display={"flex"}
              justifyContent={{ base: "flex-start", md: "flex-start" }}
              flexDirection={{ base: "column", md: "row" }}
              width={"90%"}
              gap={5}
              fontFamily={"Poppins"}
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
            </Box>
          </Box>
        </Layout>
      </Box>
    </>
  );
}

export default memo(Home);
