import { Button, Card, CardActions, CardContent, CardMedia, Typography, styled, createTheme, Container, AppBar, TextField} from "@mui/material";
import "./fonts.css"
import ToolBar from "./appBar"

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.12, 1.12, 1)", Opacity: ".8",  boxShadow: '1px 2px 9px #F4AAB9' }, 
}))

const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}in`, // (Bootstrap strategy)
});

theme.spacing(2);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export default function home(){
    return(
        <Container maxWidth={false} maxHeight={false}>

          <ToolBar/>
            <Card sx ={{height: 300,  boxShadow: '3px 3px 9px #BFC6CD', width: 1200, borderRadius: 10, marginLeft: 6, paddingLeft: 4, marginTop: 15}}  >
                <Typography height={30} gutterBottom variant="h3" component="div" class = "Ysabeau">
                  Playlists
                </Typography>
                <StyledCard sx={{ maxWidth: 345, height: 200 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      SSS
                
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        SSS
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </StyledCard>
            </Card>
            <Card sx ={{height: 300,  boxShadow: '3px 3px 9px #BFC6CD', width: 1200, borderRadius: 10, marginLeft: 6, paddingLeft: 4, marginTop: 30}}  >
                <Typography height={30} gutterBottom variant="h1" component="div" class = "Ysabeau">
                  Playlists
                </Typography>
                <StyledCard sx={{ maxWidth: 345, height: 200 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      SSS
                
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        SSS
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </StyledCard>
            </Card>
        </Container>
    )
}