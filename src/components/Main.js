import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import {
  Typography,
  Container,
  CssBaseline,
  ThemeProvider
} from '@material-ui/core';
import Peer from 'peerjs';


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
    // Peer js
    // const peer = new Peer();

let messagesEl = document.querySelector('.messages');
let peerIdEl = document.querySelector('#connect-to-peer');
let videoEl = document.querySelector('.remote-video');

let logMessage = (message) => {
  let newMessage = document.createElement('div');
  newMessage.innerText = message;
  messagesEl.appendChild(newMessage);
};

let renderVideo = (stream) => {
  videoEl.srcObject = stream;
};

// Register with the peer server
let peer = new Peer();

peer.on('open', (id) => {
  logMessage('My peer ID is: ' + id);
});
peer.on('error', (error) => {
  console.error(error);
});

// Handle incoming data connection
peer.on('connection', (conn) => {
  logMessage('incoming peer connection!');
  conn.on('data', (data) => {
    logMessage(`received: ${data}`);
  });
  conn.on('open', () => {
    conn.send('hello!');
  });
});

// Handle incoming voice/video connection
peer.on('call', (call) => {
  navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then((stream) => {
      call.answer(stream); // Answer the call with an A/V stream.
      call.on('stream', renderVideo);
    })
    .catch((err) => {
      console.error('Failed to get local stream', err);
    });
});

// Initiate outgoing connection
let connectToPeer = () => {
  let peerId = peerIdEl.value;
  logMessage(`Connecting to ${peerId}...`);
  
  let conn = peer.connect(peerId);
  conn.on('data', (data) => {
    logMessage(`received: ${data}`);
  });
  conn.on('open', () => {
    conn.send('hi!');
  });
  
  navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then((stream) => {
      let call = peer.call(peerId, stream);
      call.on('stream', renderVideo);
    })
    .catch((err) => {
      logMessage('Failed to get local stream', err);
    });
};

window.connectToPeer = connectToPeer;


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
      <video class="remote-video" autoplay></video>
    <input type="text" id="connect-to-peer" />
    <button onclick="connectToPeer()">
      Connect
    </button>
    
    <div class="messages">
      
    </div>

      </Container>
    </ThemeProvider>
  )
}
