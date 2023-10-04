import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/NavBar';

const Asignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate()
    const handleSubmit = (e) => {
      e.preventDefault();
      let payload = {name, email, password }
      axios.post("http://localhost:7000/aregister", payload)
  .then(result => console.log(result))
      .catch(err => console.log(err))
      navigate("/alogin")
            
      // Handle form submission here (e.g., send data to an API)
    };
    let formHandle1 = (e) => {
        e.preventDefault()
        navigate("/alogin")
      }
    
  return (
    <div >
      <NavBar/>
      <h1>Admin Signup</h1>
    <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8" >
      <div className="max-w-md w-full space-y-8" style={{padding:"30px", backgroundColor:"lightsteelblue",borderRadius:"25px",marginTop:"20px" }}>
        <div >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
         Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <input
              name='name'
              type="name"
              autoComplete="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              autoComplete="email"
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
             Signup
            </button>
            <br/>
            <p >Already have an account
            <button
              onClick={formHandle1}
              className="bg-dark group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
              >
              Login
            </button>
            </p>
            <br/>
        
           
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Asignup
