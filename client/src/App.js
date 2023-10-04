import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Alogin from './Admin/Alogin';
import Login from './User/Login';
import Signup from './User/Signup';
import Home from './User/Home';
import AddProject from './Admin/AddProject';
import Sidebar from './User/Sidebar';
import Projects from './Admin/Projects';
import KanbanBoard from './User/KanbanBoard';
import BoardAdd from './User/BoardAdd';
import List from './User/List';
import UserNavBar from './User/UserNavBar';
import Profile from './User/Profile';
import Searchbar from './User/Searchbar';
import Asignup from './Admin/Asignup';
import Asidebar from './Admin/Asidebar';
import Ahome from './Admin/Ahome';
import Users from './Admin/Users';
import Calender from './User/Calender';
import Aprofile from './Admin/Aprofile';
import Acalender from './Admin/Acalender';
import PrivateComponent from './Components/PrivateComponent';
import ListEdit from './User/ListEdit';
import UserEdit from './Admin/UserEdit';
import ProjectEdit from './Admin/ProjectEdit';
import Status from './User/Status';
import Card from './User/Card';
import ProjectsSummarry from './Admin/ProjectsSummary';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
      <Routes>
        {/* <Route path="/" element={<NavBar/>}/> */}
        {/* Admin */}
      <Route path="*" element={<Login/>}/>
      <Route path="/alogin" element={<Alogin/>}/>
        <Route path="/asignup" element={<Asignup/>}/>

        
        <Route  element={<PrivateComponent/>}>
        <Route path="/asidebar" element={<Asidebar/>}/>
        <Route path="/ahome" element={<Ahome/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/useredit/:id" element={<UserEdit/>}/>
        <Route path="/projectedit/:id" element={<ProjectEdit/>} />
        <Route path="/acalender" element={<Acalender/>}/>
        <Route path="/aprofile" element={<Aprofile/>}/>
        </Route> 

         
       {/* user */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route  element={<PrivateComponent/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/addproject" element={<AddProject/>}/>
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/unavbar" element={<UserNavBar/>}/>
        <Route path="/search" element={<Searchbar/>}/>
       
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/asummary" element={<ProjectsSummarry/>}/>
        <Route path="/board" element={<KanbanBoard/>}/>
        <Route path="/boardadd" element={<BoardAdd/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/listedit/:id" element={<ListEdit/>}/>
        <Route path="/calender" element={<Calender/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/status" element={<Status/>}/>
        <Route path="/status" element={<Card/>}/>
       
        </Route> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
