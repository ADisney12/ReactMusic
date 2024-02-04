import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";


export default function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isSending, setIsSending] = useState(false)
    

    // set isMounted to false when we unmount the component
    const handleClick = async (event) => {
        event.preventDefault();
        console.log(username, password)
        try {
            fetch("http://localhost:3000/CreateUser/" + username + "/" + password)
            .then(res => res.json())
            .then(res=> {
                console.log(res)
                localStorage.setItem('user', res["content"]["_id"])
                navigate(`/home/${res["insertedId"]}`)

            })
            .catch(err => {
                console.log(err)
            })
            
        } catch (err) {
            console.log(err.message)
        }
    }


  return (
    <Container maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
          <TextField
          onChange={event => setUsername(event.target.value)}
            margin="normal"
            fullWidth
            label="Username"
          />
          <TextField
          onChange={event => setPassword(event.target.value)}
            margin="normal"
            fullWidth
            label="Password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
          onClick={handleClick}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#24DC15" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
}