import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/NavBar';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate()
    const handleSubmit = (e) => {
      e.preventDefault();
      let payload = {name, email, password }
      axios.post("http://localhost:7000/register", payload)
  .then(result => console.log(result))
      .catch(err => console.log(err))
      navigate("/login")
            
      // Handle form submission here (e.g., send data to an API)
    };
    let formHandle1 = (e) => {
        e.preventDefault()
        navigate("/login")
      }
    
  return (
    <div >
      <NavBar/>
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

export default Signup

// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// // import '../Components/'
// // import './login.css'
// import { useNavigate } from 'react-router-dom';


// const Signup = () => {
//     let [name, setName] = useState("")
//     let [email, setEmail] = useState("")
// 	let [password, setPassword] = useState("")

//     let nameData = (e) => { setName(e.target.value) }
//     let emailData = (e) => { setEmail(e.target.value) }
//     let passwordData = (e) => { setPassword(e.target.value) }

// 	let navigate =useNavigate()

//     let formHandle = (e) => {
// 		e.preventDefault()
// 		let payload = {name, email, password }
// 		axios.post("http://localhost:7000/register", payload)
// 	.then(result => console.log(result))
//         .catch(err => console.log(err))
//         navigate("/login")
//         }
//         let formHandle1 = (e) => {
//             e.preventDefault()
//             navigate("/login")
//         }
        
//   return (
//     <div >
//         <form action='' onSubmit={formHandle}  >
// <section class=" gradient-custom" id='login'  >
//   <div class="container p-15 h-10"    >
//     <div class="row d-flex justify-content-center align-items-center h-30" style={{paddingTop:"55px"}}  >
//       <div class="col-12 col-md-8 col-lg-6 col-xl-5" >
//         <div class="card bg-dark text-white" style={{borderradius:"1rem",width:"450px"}}  >
//           <div class="card-body p-5 text-center" >

//             <div class="mb-md-5 mt-md-4 pb-5"  style={{height:"460px",paddingTop:"5px",width:"350px"}} >

//               <h2 class="fw-bold mb-2 text-uppercase" > Student Signup</h2>
//               <p class="text-white-50 mb-3">Please enter your  Details!</p>

//               <div class="form-outline form-white mb-2">
//               <label class="form-label" for="typeNameX">Name</label>
//                 <input type="name" id="typeEmailX" class="form-control form-control-lg" placeholder='Please enter your Name' value={name} onChange={nameData}/>
//               </div>

//               <div class="form-outline form-white mb-2">
//               <label class="form-label" for="typeEmailX">Email</label>
//                 <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder='Please enter your Email' value={email} onChange={emailData}/>
//               </div>

//               <div class="form-outline form-white mb-4">
//               <label class="form-label" for="typePasswordX">Password</label>
//                 <input type="password" id="typePasswordX" class="form-control form-control-lg" placeholder='please enter your Password' value={password} onChange={passwordData} />
//               </div>

//               <p class="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>

//               <button class="btn btn-outline-light btn-lg px-5" type="submit">Signup</button>

//               <div class="d-flex justify-content-center text-center mt-3 pt-1 pb-2">
//                 <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
//                 <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
//                 <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
//               </div>
               
//             <div>
//               <p class="mb-0"> have an account? <a href="#!" class="text-white-50 fw-bold" onClick={formHandle1}>Login</a>
//               </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>
//   </form>
//     </div>
//   )
// }

// export default Signup


// .then(result => 
//   {
//     if(result.status === 200)
//     {
//            navigate("/about")
//     }
//     else{
//       alert('Invalid Credentials')
//     }
//   }
//   )
//       .catch(err => console.log(err))
//   navigate('/about') 
//       }