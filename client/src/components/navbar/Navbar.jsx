import { Box, Button, Link, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";
import { TbSquareRoundedChevronRight } from "react-icons/tb";
import { UserData } from "../../hook/context/User";

function Navbar() {
  const { user, logoutUser } = UserData();
  const navigate = useNavigate();
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        width={"100%"}
        fontFamily={"Poppins"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          fontFamily={"Poppins"}
          fontWeight={"semibold"}
          my={10}
          width={"100%"}
          px={2}
        >
          <Box display={"flex"} alignItems={"center"} gap={2} width={"auto"}>
            <TbSquareRoundedChevronLeft
              size={32}
              onClick={() => navigate(-1)}
            />
            <TbSquareRoundedChevronRight
              size={32}
              onClick={() => navigate(+1)}
            />
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={2} width={"auto"}>
            <Button size={"sm"} borderRadius={"14px"}>
              <Link
                as={RouterLink}
                to={user && user.role === "admin" ? "/admin" : "/"}
                fontSize={"xs"}
                _hover={{ textDecoration: "none" }}
              >
                {user && user.role === "admin" ? "Admin" : "Home"}
              </Link>
            </Button>

            <Button
              size={"sm"}
              borderRadius={"14px"}
              variant={"outline"}
              onClick={logoutUser}
             
            >
              <Text fontSize={"xs"} color={"white"} _hover={{ color: "blackAlpha.800" }} >
                Logout
              </Text>
            </Button>
          </Box>
        </Box>
        {/*ALL, MUSIC E PODCCAST* */}
        <Box display={"flex"} gap={2} width={"100%"} ms={2} mb={10}>
          <Button
            borderRadius={"16px"}
            size={"sm"}
            onClick={() => navigate("/")}
            _hover={{ fontWeight: "bold" }}

          >
            All
          </Button>

          <Button
            display={{ base: "none", md: "block" }}
            borderRadius={"16px"}
            size={"sm"}
            bg={"blackAlpha.800"}
            color={"white"}
            _hover={{ color: "gray" }}
          >
            Music
          </Button>
          <Button
            display={{ base: "none", md: "block" }}
            borderRadius={"16px"}
            size={"sm"}
            bg={"blackAlpha.800"}
            color={"white"}
            _hover={{ color: "gray" }}
          >
            Podcast
          </Button>
          <Button
            display={{ base: "block", md: "none" }}
            borderRadius={"16px"}
            size={"sm"}
            onClick={() => navigate("/playlist")}
          >
            Playlist
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default memo(Navbar);
