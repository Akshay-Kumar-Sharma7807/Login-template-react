import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import {
  Typography,
  Container,
  CssBaseline,
  ThemeProvider
} from '@material-ui/core';

export default function Main(props) {
  const [user,setUser] = useState('');
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user"
    }).then((res) => {
      setUser(res.data.username)
    });
    
  }, [])
  var getuser =()=>{
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user"
    }).then((res) => setUser(res.data.username));
  }
  return (
    <ThemeProvider theme={props.theme}>
      <Container component="main" maxWidth="xs">
    <CssBaseline />
      {
        props.authenticated ?       <Typography variant='h2' align='center' gutterBottom>{user ? 'Hello '+user: 'NO user'}</Typography>
        :       <h1></h1>
      }
      {/* <button onClick={getuser}>Get User</button> */}
      {/* <Typography>{user ? 'Hello '+user: 'NO user'}</Typography> */}
      </Container>
    </ThemeProvider>
  )
}
