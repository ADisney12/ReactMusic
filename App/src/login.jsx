import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import OptionalText from "./OptionalText";


export default function SignIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [invalidCred, setInvalidCred] = useState(false)

    useEffect(() => {
      const itemSet = (localStorage.getItem('user') !== null);

      if (itemSet)  {
        navigate(`/home/${localStorage.getItem('user')}`)
      }
    }, []);
    
    
      const palette = {
        primary: {
          main: '#207FE9',
        },
      }
    
    

    
    

    // set isMounted to false when we unmount the component
    const handleClick = async (event) => {
        event.preventDefault();
        try {
            fetch("http://localhost:3000/" + username + "/" + password)
            .then(res => res.json())
            .then(res=> {
                if(res.status == "success"){
                    console.log(res["content"]["_id"])
                    localStorage.setItem('user', res["content"]["_id"])
                 navigate(`/home/${res.content["_id"]}`)
                }
                if (res.status == "fail" ){
                    setInvalidCred((true))
                    console.log(invalidCred)
                }
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
          Sign in
        </Typography>
          
        <OptionalText invalid = {invalidCred}/>

          <TextField
          onChange={event => setUsername(event.target.value)}
            margin="normal"
            fullWidth
            label="Username"
            sx={{ outlineColor: invalidCred ? "#f44336" : undefined, }}
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
            sx={{ mt: 3, mb: 2,  backgroundColor: "#AB90D6", height: 30
             }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
}