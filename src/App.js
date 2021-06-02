import './App.css';
import {useState, useEffect} from 'react';
// import Login from './components/Login';
// import Register from './components/Register';
// import GetUser from './components/GetUser';
import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
import AppHeader from './components/AppHeader';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from './components/SignUp';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import Main from './components/Main';
import Axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#32A98A',
      contrastText: 'white'
    },
    secondary:{
      main: '#E62C20',
      contrastText: 'white'
    },
    type: 'dark'
  }
})

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user", 
    }).then((res) => {
      if(res.data.username){
        setAuthenticated(true);
      }
    });
    
  }, [])
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <div className="App">
      {/* <header className="header">
        <h1 className="app-heading"><a href="/">Akshay</a></h1>
        <nav className="nav">
          <Link to='/'>Home</Link>
          <Link to='/profile'>Profile </Link>
        </nav>
      </header> */}
      <AppHeader />
      {/* <Login />
      <Register /> */}
      <div className='container'>
      <Switch>
      <Route path='/' exact>
        {/* <Login /> */}
        <SignIn setAuthenticated={setAuthenticated} />
        {/* <Register /> */} 
        {/* <GetUser /> */}
      </Route>
      <Route path='/app'>
        <Main authenticated={authenticated} theme={theme} />
      </Route>
      <Route path='/sign-up'>
        {/* <Profile /> */}
        <SignUp setUser />
      </Route>
      </Switch>
      </div>
    </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
