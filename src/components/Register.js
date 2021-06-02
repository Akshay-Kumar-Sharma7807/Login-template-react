import React,{useState} from 'react';
import Axios from 'axios';

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  let registerSubmit =(e)=>{
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => console.log(res));
  }
  return (
    <div>
      <h2 className='title'>Register</h2>
      <form onSubmit={registerSubmit}>
      <input type="text" onChange={(e)=>{
        setRegisterUsername(e.target.value)
      }} required />
      <input type="password" onChange={(e)=>{
        setRegisterPassword(e.target.value)
      }} required />
      <button >Submit</button>
      </form>
    </div>
  )
}
