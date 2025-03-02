import { memo, useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import useShowToast from "../hook/useShowToast";
import { UserData } from "../hook/context/User";
import { SongData } from "../hook/context/Song";

 function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, loading } = UserData();

  const { fetchSongs, fetchAlbums } = SongData();

  const showToast = useShowToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Error", "Please fill all fields", "error");
      return;
    }

    loginUser(email, password, navigate, fetchSongs, fetchAlbums);
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={{sm:"center",md:"flex-start"}}
      alignItems={"center"}
      gap={8}
      width={"100%"}
      mx={"auto"}
      mb={5}
      height={"auto"}
    >
      <Image
        src={Logo}
        alt="Logo"
        width={"100px"}
        objectFit={"cover"}
        mt={10}
      />
      <Text
        fontFamily={"Poppins"}
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight={"semibold"}
        letterSpacing={0.5}
        textAlign={{base:"center", md:"left"}}
      >
        Login to start your journey
      </Text>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={5}
        width={"100%"}
      >
        <form onSubmit={handleSubmit}>
          <InputGroup width={"full"}>
            <InputLeftElement>
              <MdOutlineMailLock />
            </InputLeftElement>
            <Input
              borderRadius={"20px"}
              width="100%"
              type="email"
              placeholder="Email"
              htmlSize={"14px"}
              isRequired
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup width={"full"}>
            <InputLeftElement>
              <RiLockPasswordFill />
            </InputLeftElement>
            <Input
              borderRadius={"20px"}
              width="100%"
              type="password"
              placeholder="Password"
              htmlSize={"14px"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
          </InputGroup>

          <Button
            type="submit"
            bg={"green.300"}
            borderRadius={"20px"}
            fontFamily={"Poppins"}
            color={"blackAlpha.800"}
            transition={"all 0.4s ease"}
            _hover={{
              bg: "transparent",
              transition: "all 0.4s ease",
              transform: "scale(1.1)",
            }}
            mt={4}
            isLoading={loading}
            loadingText="Accedendo..."
          >
            Login
          </Button>
        </form>

        <Text fontFamily={"Lato"} fontSize={"sm"} letterSpacing={0.5}>
          Non hai un account?
          <Link href="/register">
            <b> Registrati </b>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default memo(Login);