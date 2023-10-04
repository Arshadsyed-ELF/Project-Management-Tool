
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <div>
       <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Project-Managment Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div style={{paddingLeft:"800px"}}>
            <NavDropdown title="Login" id="basic-nav-dropdown" >
              <NavDropdown.Item href="/login">User</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.2">Interviewer</NavDropdown.Item> */}
              <NavDropdown.Item href="/alogin">Admin</NavDropdown.Item>
            </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
    </div>
  );
}

export default NavBar;
