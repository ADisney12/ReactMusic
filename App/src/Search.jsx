import React, { useEffect, useState } from 'react';
import { Container, TextField, Box, Button, Card, Typography, styled, createTheme, CardContent, CardMedia } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import YouTube from 'react-youtube';
import PauseIcon from '@mui/icons-material/Pause';
import { useParams, useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.12, 1.12, 1)", Opacity: ".8", boxShadow: '5px 2px 9px #F4AAB9' },
}));

const StyledIcon = styled(PlayCircleIcon)(({ theme }) => ({
  borderRadius: "25px",
  transition: "transform 0.10s ease-in-out",
  "&:hover": { transform: "scale3d(1.3, 1.3, 1)", Opacity: ".8", boxShadow: '1px 2px 9px #F4AAB9' },
}));

const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}in`,
});

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [playIndex, setPlayIndex] = useState(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [text, setText] = useState("");
  const [videoOpts, setVideoOpts] = useState({
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      start: pausedTime
    },
  });
  const params = useParams();
  const navigate = useNavigate();

  const GetData = async () => {
    try {
      const response = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + params["SearchQuery"] + "&key=AIzaSyB-WNTBPzLVL5dIED_L7TyJVJTBtv-Y-rU&maxResults=10 ", { mode: 'cors' });
      const data = await response.json();
      for( var i = 0; i < data.items.length; i++){ 
    
        if ( data.items[i]["id"]["kind"] != "youtube#video") { 
    
            data.items.splice(i, 1); 
        }
    
    }
      setData(data.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleCardClick = (index, event) => {
    if (playIndex === index) {
      setPlayIndex(null);
      setVideoOpts({
        ...videoOpts,
        playerVars: { ...videoOpts.playerVars, autoplay: 0 },
      });
      setPausedTime(event["timeStamp"] / 1000);
    } else {
      setPlayIndex(index);
      const videoId = data[index].id.videoId;
      if (videoId) {
        setVideoOpts({
          ...videoOpts,
          height: '0',
          width: '0',
          playerVars: { ...videoOpts.playerVars, autoplay: 1, start: pausedTime || 0 },
        });
      }
    }
  };

  const MapElements = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data) {
      return null;
    }
    console.log(data)

    return (
      data.map((e, index) => (
        <StyledCard sx={{ display: 'flex', width: "50%", marginBottom: "10%" }} key={e.id.videoId} onClick={(event) => handleCardClick(index, event)}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h7">
                {e.snippet.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {e.snippet.channelTitle}
              </Typography>
            </CardContent>
            {playIndex === index ? (
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <PauseIcon sx={{ fontSize: "50px" }} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <StyledIcon sx={{ fontSize: "50px" }} />
              </Box>
            )}
          </Box>
          <CardMedia
            component="img"
            image={e.snippet.thumbnails.high.url}
            alt="Live from space album cover"
          />
          {playIndex !== null && playIndex === index && (
            <YouTube videoId={e.id.videoId} opts={videoOpts} />
          )}
        </StyledCard>
      ))
    );
  };

  const research = async () => {
    console.log(params["id"]);
    navigate("/" + params["id"] + "/Search/" + text);
    window.location.reload();
  };

  return (
    <Container maxWidth={false} maxHeight={false}>
      <Box sx={{ borderColor: "#302F2F", flexGrow: 1 }}>
        <TextField label="searchs" onChange={(e) => { setText(e.target.value) }} />
        <Button variant="contained" sx={{ height: 55 }} onClick={() => research()}>
          <SearchIcon />
        </Button>
      </Box>

      <Stack spacing={2}>
        <Card sx={{ boxShadow: '3px 3px 9px #BFC6CD', width: 1000, borderRadius: 10, marginLeft: 6, paddingLeft: 4, marginTop: 15 }}>
          <Typography height={30} gutterBottom variant="h3" component="div" class="Ysabeau">
            Songs
          </Typography>
          <MapElements />
        </Card>
      </Stack>
    </Container>
  );
}
