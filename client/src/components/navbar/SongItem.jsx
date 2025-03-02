import React, { memo, useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { UserData } from "../../hook/context/User";
import { SongData } from "../../hook/context/Song";
import { Box, Button, Image, Text } from "@chakra-ui/react";

 function SongItem({ image, name, desc, id }) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { addToPlaylist, user } = UserData();

  const { setSelectedSong, setIsPlaying } = SongData();

  const playList = user.playlist;

  useEffect(() => {
    if (playList && playList.includes(id)) {
      setSaved(true);
    }
  }, [user]);

  const savetoPlaylistHandler = () => {
    setSaved(!saved);
    addToPlaylist(id);
  };

  return (
    <Box
      minW={"180px"}
      p={2}
      px={3}
      rounded={"lg"}
      cursor={"pointer"}
      _hover={{ bg: "#ffffff26" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box position={"relative"}>
        <Image src={image} rounded={"lg"} width={"160px"} alt="" />
        <Box display={"flex"} gap={2}>
          <Button
            position={"absolute"}
            bottom={2}
            left={2}
            bg={"green.500"}
            color={"black"}
            p={1}
            rounded={"full"}
            opacity={hovered ? 1 : 0}
            onClick={() => {
              setSelectedSong(id);
              setIsPlaying(true);
            }}
          >
            <FaPlay size={16} />
          </Button>
          <Button
            position={"absolute"}
            bottom={2}
            right={2}
            bg={"green.500"}
            color={"black"}
            p={1}
            opacity={hovered ? 1 : 0}
            onClick={savetoPlaylistHandler}
          >
            {saved ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}{" "}
          </Button>
        </Box>
      </Box>
      <Text fontFamily={"Poppins"} fontWeight={"semibold"} fontSize={"md"}>
        {name}
      </Text>
      <Text fontFamily={"Poppins"} fontWeight={"normal"} fontSize={"xs"}>
        {desc}
      </Text>
    </Box>
  );
}

export default memo(SongItem);