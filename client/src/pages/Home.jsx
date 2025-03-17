import { memo, useState, useEffect } from "react";
import Layout from "../components/navbar/Layout";
import { Box, Heading, Flex, Grid, Text, Image, Button, Badge, Icon, Spinner, useToast } from "@chakra-ui/react";
import { SongData } from "../hook/context/Song";
import AlbumItem from "../components/navbar/AlbumItem";
import SongItem from "../components/navbar/SongItem";
import { FaYoutube, FaPlay } from "react-icons/fa";
import { searchVideos, testApiKey } from "../utils/youtubeService";
import { useLocation } from "react-router-dom";

function Home() {
  const { songs, albums } = SongData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);
  const [apiKeyValid, setApiKeyValid] = useState(true);
  
  const toast = useToast();

  // Verifica la validità della chiave API all'avvio
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const result = await testApiKey();
        setApiKeyValid(result.valid);
        
        if (!result.valid) {
          console.warn("YouTube API key is invalid:", result.message);
          setError("Utilizzo dati di esempio: chiave API YouTube non valida");
        }
      } catch (err) {
        console.error("Error testing API key:", err);
        setApiKeyValid(false);
      }
    };
    
    checkApiKey();
  }, []);

  // Carica i video di YouTube quando cambia la query di ricerca
  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      if (!query) {
        setYoutubeVideos([]);
        setSelectedVideo(null);
        return;
      }

      setLoadingVideos(true);
      setError(null);

      try {
        console.log("Searching for:", query);
        const results = await searchVideos(query);
        
        if (results && results.length > 0) {
          setYoutubeVideos(results);
          setError(null);
        } else {
          setYoutubeVideos([]);
          setError("Nessun risultato trovato per: " + query);
        }
      } catch (err) {
        console.error("Errore nel recupero dei video:", err);
        setError("Impossibile caricare i video. Riprova più tardi.");
        
        toast({
          title: "Errore ricerca",
          description: "Problema di connessione all'API YouTube. Mostro risultati di esempio.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchYoutubeVideos();
  }, [query, toast]);

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    // Scorri alla parte superiore per vedere il video
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box width="100%" overflowX="hidden">
      <Layout>
        {/* YouTube Video Player (quando un video è selezionato) */}
        {selectedVideo && (
          <Box
            as="section"
            mb={8}
            px={4}
            pt={5}
          >
            <Box mb={4} bg="rgba(24,24,24,0.6)" borderRadius="md" overflow="hidden">
              <Flex direction="column">
                <Box position="relative" paddingBottom="56.25%" height="0" overflow="hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0
                    }}
                  />
                </Box>
                <Box p={4}>
                  <Heading size="md">{selectedVideo.snippet.title}</Heading>
                  <Text color="whiteAlpha.700" mt={1}>{selectedVideo.snippet.channelTitle}</Text>
                  <Text mt={3} color="whiteAlpha.800">{selectedVideo.snippet.description}</Text>
                </Box>
              </Flex>
            </Box>
          </Box>
        )}

        {/* Sezione risultati di ricerca YouTube */}
        {query && (
          <Box
            as="section"
            mb={16}
            px={4}
            pt={5}
          >
            <Flex align="center" mb={6}>
              <Icon as={FaYoutube} color="red.500" boxSize={6} mr={3} />
              <Heading 
                fontSize={{ base: "xl", md: "2xl" }} 
                fontWeight="bold"
                letterSpacing="tight"
              >
                Risultati YouTube per: {query}
              </Heading>
            </Flex>

            {loadingVideos ? (
              <Flex justify="center" align="center" minH="200px">
                <Spinner size="xl" color="#1DB954" thickness="4px" />
              </Flex>
            ) : error && youtubeVideos.length === 0 ? (
              <Text color="red.400" textAlign="center" p={4}>{error}</Text>
            ) : youtubeVideos.length === 0 ? (
              <Text color="whiteAlpha.700" textAlign="center" p={4}>Nessun risultato trovato.</Text>
            ) : (
              <>
                {!apiKeyValid && (
                  <Text color="yellow.500" mb={4} fontSize="sm">
                    Nota: Vengono mostrati dati di esempio a causa di problemi con l'API YouTube.
                  </Text>
                )}
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                    xl: "repeat(5, 1fr)",
                  }}
                  gap={6}
                >
                  {youtubeVideos.map((video) => (
                    <Box 
                      key={video.id.videoId} 
                      bg="rgba(24,24,24,0.6)" 
                      borderRadius="md" 
                      overflow="hidden"
                      transition="all 0.3s"
                      _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
                      cursor="pointer"
                      onClick={() => handlePlayVideo(video)}
                    >
                      <Box position="relative">
                        <Image 
                          src={video.snippet.thumbnails.medium.url} 
                          alt={video.snippet.title} 
                          width="100%"
                        />
                        <Flex 
                          position="absolute" 
                          top="0" 
                          left="0" 
                          width="100%" 
                          height="100%" 
                          justify="center" 
                          align="center"
                          bg="rgba(0,0,0,0.4)"
                          opacity="0"
                          transition="opacity 0.2s"
                          _hover={{ opacity: 1 }}
                        >
                          <Button 
                            colorScheme="red" 
                            leftIcon={<FaPlay />} 
                            size="sm" 
                            borderRadius="full"
                          >
                            Play
                          </Button>
                        </Flex>
                        <Badge 
                          position="absolute" 
                          bottom="2" 
                          right="2" 
                          colorScheme="red" 
                          borderRadius="full" 
                          px={2}
                        >
                          YouTube
                        </Badge>
                      </Box>
                      <Box p={3}>
                        <Text fontWeight="bold" noOfLines={2} mb={1}>
                          {video.snippet.title}
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          {video.snippet.channelTitle}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        )}

        {/* Sezione Albums */}
        <Box
          as="section"
          mb={16} 
          px={4}
          pt={!query ? 5 : 0}
        >
          <Flex 
            justify="space-between" 
            align="center" 
            mb={8} 
          >
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
        <Box
          as="section"
          mb={16} 
          px={4}
        >
          <Flex 
            justify="space-between" 
            align="center" 
            mb={8} 
          >
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
        <Box
          as="section"
          mb={16}
          px={4}
        >
          <Flex 
            justify="space-between" 
            align="center" 
            mb={8}
          >
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