import React,{useState} from 'react';
import Axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let submit =(e)=>{
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username,
        password,
      },
      withCredentials: true,
      url: "http://localhost:4000/login", 
    }).then((res) => console.log(res));
  }
  return (
    <div>
      <h2 className='title'>Login</h2>
      <form onSubmit={submit}>
      <input type="text" onChange={(e)=>{
        setUsername(e.target.value)
      }} required />
      <input type="password" onChange={(e)=>{
        setPassword(e.target.value)
      }} required />
      <button>Submit</button>
      </form>
    </div>
  )
}
