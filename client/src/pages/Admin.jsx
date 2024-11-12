import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Select,
  Text,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UserData } from "../hook/context/User.jsx";
import { SongData } from "../hook/context/Song.jsx";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useShowToast from "../hook/useShowToast.js";
import { MdDelete, MdOutlineTitle } from "react-icons/md";
import { CiTextAlignLeft } from "react-icons/ci";

export default function Admin() {
  const { user } = UserData();
  const {
    albums,
    songs,
    addAlbum,
    addSong,
    addThumbnail,
    deleteSong,
  } = SongData();
  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    if (user && user.role !== "admin") {
      showToast("Error", "Non sei amministratore !", "error");
      navigate("/");
    }
  }, [user]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [singer, setSinger] = useState("");
  const [album, setAlbum] = useState("");

  const [loadingAddAlbum, setLoadingAddAlbum] = useState(false);
  const [loadingAddSong, setLoadingAddSong] = useState(false);
  const [loadingAddThumbnail, setLoadingAddThumbnail] = useState(false);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const addAlbumHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    
    await addAlbum(formData, setTitle, setDescription, setFile);
  };

  const addSongHandler = async (e) => {
    e.preventDefault();
    setLoadingAddSong(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("singer", singer);
    formData.append("album", album);
    formData.append("file", file);
    
    await addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum);
    setLoadingAddSong(false);
  };

  const addThumbnailHandler = async (id) => {
    setLoadingAddThumbnail(true);
    const formData = new FormData();
    formData.append("file", file);
    
    await addThumbnail(id, formData, setFile);
    setLoadingAddThumbnail(false);
  };

  const deleteHandler = (id) => {
    if (confirm("Are you sure you want to delete this song?")) {
      deleteSong(id);
    }
  };

  return (
    <>
      <Box
        color={"white"}
        height={"auto"}
        bgColor={"blackAlpha.900"}
        p={8}
        width={"100%"}
      >
        <Link
          display={"block"}
          width={"200px"}
          as={RouterLink}
          to="/"
          bg={"green.500"}
          color={"white"}
          fontFamily={"Poppins"}
          fontWeight={"semibold"}
          py={2}
          px={4}
          borderRadius={"16px"}
          _hover={{ textDecoration: "none" }}
        >
          Go to home page
        </Link>
        <Heading fontSize={"2xl"} fontFamily={"Poppins"} my={6}>
          Add Album
        </Heading>
        <form onSubmit={addAlbumHandler}>
          <Box bg={"blackAlpha.700"} p={6} borderRadius={"lg"} boxShadow={"lg"}>
            <InputGroup width={"full"}>
              <InputLeftElement>
 <MdOutlineTitle />
              </InputLeftElement>
              <Input
                borderRadius={"20px"}
                width="100%"
                type="text"
                placeholder="Title"
                htmlSize={"14px"}
                isRequired
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
            <InputGroup width={"full"} my={8}>
              <InputLeftElement>
                <CiTextAlignLeft />
              </InputLeftElement>
              <Input
                borderRadius={"20px"}
                width="100%"
                type="text"
                placeholder="Description"
                htmlSize={"14px"}
                isRequired
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
            <Input
              border={"none"}
              display={"block"}
              borderRadius={"20px"}
              width="100%"
              type="file"
              accept="image/*"
              isRequired
              mt={8}
              onChange={fileChangeHandler}
            />
            <Button
              type="submit"
              bg={"green.400"}
              color={"white"}
              width={"100%"}
              mx={"auto"}
              my={10}
              size={"lg"}
              _hover={{ background: "green.500" }}
              isLoading={loadingAddAlbum}
              loadingText="Adding..."
            >
              Add
            </Button>
          </Box>
        </form>

        <form onSubmit={addSongHandler}>
          <Heading fontSize={"2xl"} fontFamily={"Poppins"} mt={20}>
            Add Song
          </Heading>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={8}
            bg={"blackAlpha.700"}
            p={6}
            borderRadius={"lg"}
            boxShadow={"lg"}
          >
            <InputGroup width={"full"}>
              <InputLeftElement>
                <MdOutlineTitle />
              </InputLeftElement>
              <Input
                borderRadius={"20px"}
                width="100%"
                type="text"
                placeholder="Title"
                htmlSize={"14px"}
                isRequired
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>

            <InputGroup width={"full"}>
              <InputLeftElement>
                <MdOutlineTitle />
              </InputLeftElement>
              <Input
                borderRadius={"20px"}
                width="100%"
                type="text"
                placeholder="Description"
                htmlSize={"14px"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>

            <InputGroup width={"full"}>
              <InputLeftElement>
                <MdOutlineTitle />
              </InputLeftElement>
              <Input
                borderRadius={"20px"}
                width="100%"
                type="text"
                placeholder="Singer"
                htmlSize={"14px"}
                isRequired
                value={singer}
                onChange={(e) => setSinger(e.target.value)}
              />
            </InputGroup>

            <Select value={album} onChange={(e) => setAlbum(e.target.value)}>
              <option value="">Choose Album</option>
              {albums &&
                albums.map((e, i) => (
                  <option value={e._id} key={i}>
                    {e.title}
                  </option>
                ))}
            </Select>

            <Input
              border={"none"}
              display={"block"}
              borderRadius={"20px"}
              width="100%"
              type="file"
              accept="audio/*"
              isRequired
              mt={8}
              onChange={fileChangeHandler}
            />
            <Button
              bg={"green.400"}
              color={"white"}
              width={"100%"}
              mx={"auto"}
              my={10}
              size={"lg"}
              _hover={{ background: "green.500" }}
              type="submit"
              isLoading={loadingAddSong}
              loadingText="Adding..."
            >
              Add
            </Button>
          </Box>
        </form>
        <Heading fontFamily={"Poppins"} my={10}>
            Added Songs
          </Heading>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"fle-start"}
          alignItems={"flex-start"}
          gap={5}
          flexWrap={"wrap"}
        >
          

          {songs &&
            songs.map((e, i) => (
              <Box key={i} bg={"#181818"} p={4} rounded={"lg"} shadow={"md"}>
                {e.thumbnail ? (
                  <Image
                    src={e.thumbnail.url}
                    alt="image"
                    mr={1}
                    w={"80px"}
                    height={" 80px"}
                    objectFit={"cover"}
                  />
                ) : (
                  <Box
                   display={"block"}
                  >
                    <Input type="file" onChange={fileChangeHandler} />
                    <Button
                      onClick={() => addThumbnailHandler(e._id)}
                      bg={"green.400"}
                      color={"white"}
                      px={2}
                      py={1}
                      rounded={"lg"}
                      isLoading={loadingAddThumbnail}
                      loadingText="Adding..."
                    >
                      Add Thumbnail
                    </Button>
                  </Box>
                )}
                <Text
                  fontFamily={"Poppins"}
                  fontSize={"lg"}
                  fontWeight={"semibold"}
                >
                  {e.title}
                </Text>
                <Text fontFamily={"Poppins"} fontSize={"sm"} color={"gray.400"}>
                  {e.singer}
                </Text>

                <Button
                  onClick={() => deleteHandler(e._id)}
                  px={3}
                  py={1}
                  bg={"red.500"}
                  color={"white"}
                  rounded={"3xl"}
                  mt={5}
                >
                  <MdDelete />
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}