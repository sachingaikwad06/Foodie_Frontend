import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {login} = useAuth()


  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("")
    try {
      const response = await api.post("/auth/login", {
        email,password
      });
      const {token} = response.data;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role

      login(token, role);
      navigate("/restaurants")
    } catch (error) {
      setError("Invalid email or password")
    }
  }
  return (
    <div className='max-w-4xl bg-blue-100 p-3 mx-auto py-3'>
      <h2 className='text-4xl'>Login Form</h2>
      {error && <p className='text-red-500'>{error}</p> }
      <form onSubmit={handleSubmit}>
        <div className='my-3'>
          <label className='text-xl'>Email:</label>
          <input type="email" className='border mx-2 p-2' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='my-3'>
          <label >Password:</label>
          <input type="password" className='border mx-2 p-2' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='my-3 text-xl'>
          <button className='border p-2 rounded text-center' type='submit'>Submit</button>
        </div>       
      </form>
    </div>
  )
}

export default Login