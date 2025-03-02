import { memo, useState } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import Logo from "../assets/logo.png";
import { FaUserAstronaut } from "react-icons/fa6";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import useShowToast from "../hook/useShowToast";
import { UserData } from "../hook/context/User";
import { SongData } from "../hook/context/Song";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, registerUser } = UserData();
  const showToast = useShowToast();
  const navigate = useNavigate();

  const { fetchSongs, fetchAlbums } = SongData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast("Error", "Please fill all fields", "error");
      return;
    }

    registerUser(name, email, password, navigate, fetchSongs, fetchAlbums);
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={{ sm: "center", md: "flex-start" }}
      alignItems={"center"}
      gap={4}
      width={"100%"}
      mx={"auto"}
      mb={5}
      height={"auto"}
    >
      <Image
        src={Logo}
        alt="Logo"
        width={"150px"}
        objectFit={"cover"}
        mt={10}
      />
      <Text
        fontFamily={"Poppins"}
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight={"semibold"}
        letterSpacing={0.5}
      >
        Sign up to listen
      </Text>

      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={5}
        width={"80%"}
      >
        <form onSubmit={handleSubmit}>
          <InputGroup width={"full"}>
            <InputLeftElement>
              <FaUserAstronaut />
            </InputLeftElement>
            <Input
              borderRadius={"20px"}
              width="100%"
              type="text"
              placeholder="Name"
              htmlSize={"14px"}
              isRequired
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>

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
            loadingText="Registrando..."
          >
            Registrati
          </Button>
        </form>

        <Text fontFamily={"Lato"} fontSize={"sm"} letterSpacing={0.5}>
          Hai già un account?
          <Link href="/login">
            <b> Accedi </b>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
export default memo(Register);
