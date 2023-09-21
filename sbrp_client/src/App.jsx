import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

//CSS
import './App.css'
import Listings from './pages/Listings';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';


function App() {
  // const [data, setData] = useState("");

  // useEffect(() => {

  //   const fetchStaff = async () => {
  //     const res = await fetch('/api/staff');
  //     const resData = await res.json();
  //     setData(resData.data);
  //   }
  //   fetchStaff();

  // }, [])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossorigin="anonymous"
      />
      <BrowserRouter>
        <header>
          <Navbar className='bg-body-tertiary'>
            <Container>
              <Navbar.Brand>SBRP</Navbar.Brand>
              <Nav>
                <NavLink to="/listings"className="nav-link">Listings</NavLink>
                <NavLink to="/help"className="nav-link">Help</NavLink>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container>
            <Routes>
              <Route path="/listings" element={<Listings />} />
              {/* <Route path="/help" element={<Help/>} /> */}
            </Routes>
          </Container>
        </main>

      </BrowserRouter >
    </>
  )
}

export default App
