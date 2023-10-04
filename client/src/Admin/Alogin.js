import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from '../Components/NavBar';
import 'react-toastify/dist/ReactToastify.css';


const Alogin =()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
  const navigate=useNavigate()

  axios.defaults.withCredentials =true;
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { email, password }
    axios.post("http://localhost:7000/alogin", payload)
      .then(res => {
        console.log("login: " + res.data.Status);
        if (res.data.Status === "Success") {
          console.log(res.data.user);
          localStorage.setItem('user',JSON.stringify(res.data.user))
          navigate('/ahome')
          toast.success("login sucessfull")
            } else {
          toast.error("wrong credentials")
        }
      }).catch(err => console.log(err))
  };
  let formHandle1 = (e) => {
    e.preventDefault()
    navigate("/asignup")
  }
  return (
    <div >
      <NavBar/>
      <h1>Admin Login</h1>

    <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8" >
      <div className="max-w-md w-full space-y-8" style={{padding:"30px", backgroundColor:"lightsteelblue",borderRadius:"25px",marginTop:"50px" }}>
        <div >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-dark group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
              >
              Log in
            </button>
            <br/>
          <p >Don't have account create
          <button
             onClick={formHandle1}
              className="bg-dark group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
            >
                Signup
             {/* <Link to='/signup' style={{textDecoration:"none", color:"white"}}>Signup</Link> */}
            </button>
          </p>
           
          </div>
        </form>
      </div>
    </div>
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  );
}

export default Alogin;
