import { Box, Button, Link, Text, Flex, IconButton, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import React, { memo } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { UserData } from "../../hook/context/User";

function Navbar() {
  const { user, logoutUser } = UserData();
  const navigate = useNavigate();
  
  // Colori e stili
  const buttonBg = useColorModeValue("rgba(0,0,0,0.7)", "rgba(0,0,0,0.7)");
  const buttonHoverBg = useColorModeValue("rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)");
  
  return (
    <Box 
      width="100%" 
      position="sticky" 
      top="0" 
      zIndex="10"
      bg="rgba(0,0,0,0.75)"
      backdropFilter="blur(10px)"
      py={2}
      px={4}
    >
      <Flex 
        justify="space-between" 
        align="center" 
        width="100%"
      >
        {/* Navigazione */}
        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Go back"
            icon={<TbChevronLeft size={20} />}
            onClick={() => navigate(-1)}
            size="sm"
            borderRadius="full"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
          />
          <IconButton
            aria-label="Go forward"
            icon={<TbChevronRight size={20} />}
            onClick={() => navigate(1)}
            size="sm"
            borderRadius="full"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
          />
        </Flex>
        
        {/* Filtri centrali */}
        <Flex 
          display={{ base: "none", md: "flex" }}
          align="center" 
          gap={2}
        >
          <Button
            size="sm"
            borderRadius="full"
            bg="#1DB954"
            color="black"
            fontWeight="bold"
            _hover={{ bg: "#1ED760", transform: "scale(1.05)" }}
            transition="all 0.2s"
            px={5}
            onClick={() => navigate("/")}
          >
            All
          </Button>
          
          <Button
            borderRadius="full"
            size="sm"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
            px={5}
          >
            Music
          </Button>
          
          <Button
            borderRadius="full"
            size="sm"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
            px={5}
          >
            Podcast
          </Button>
        </Flex>
        
        {/* Filtri per mobile */}
        <Flex 
          display={{ base: "flex", md: "none" }}
          align="center" 
          gap={2}
        >
          <Button
            size="sm"
            borderRadius="full"
            bg="#1DB954"
            color="black"
            fontWeight="bold"
            _hover={{ bg: "#1ED760" }}
            px={4}
            onClick={() => navigate("/")}
          >
            All
          </Button>
          
          <Button
            borderRadius="full"
            size="sm"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
            px={4}
            onClick={() => navigate("/playlist")}
          >
            Playlist
          </Button>
        </Flex>
        
        {/* Profilo e Logout */}
        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            borderRadius="full"
            size="sm"
            px={2}
          >
            <Flex align="center" gap={2}>
              <Avatar 
                size="xs" 
                name={user?.name || "User"} 
                bg="#1DB954"
                color="black" 
              />
              <Text 
                fontSize="sm" 
                display={{ base: "none", sm: "block" }} 
                color="white"
                fontWeight="medium"
              >
                {user?.name?.split(' ')[0] || "User"}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList 
            bg="#121212" 
            borderColor="#333"
            borderWidth="1px"
            boxShadow="0px 5px 15px rgba(0, 0, 0, 0.8)"
            p={1}
          >
            <MenuItem 
              icon={<FaHome color="#1DB954" />}
              _hover={{ bg: "gray.100" }}
              color="black"
              fontWeight="medium"
              onClick={() => navigate(user && user.role === "admin" ? "/admin" : "/")}
              py={2}
            >
              {user && user.role === "admin" ? "Admin" : "Home"}
            </MenuItem>
           
            <MenuItem 
              icon={<FaSignOutAlt color="#1DB954" />}
              _hover={{ bg: "gray.100" }}
              color="black"
              fontWeight="medium"
              onClick={logoutUser}
              py={2}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default memo(Navbar);