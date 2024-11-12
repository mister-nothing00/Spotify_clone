import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./hook/context/User.jsx";
import { SongProvider } from "./hook/context/Song.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SongProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </SongProvider>
    </UserProvider>
  </StrictMode>
);
