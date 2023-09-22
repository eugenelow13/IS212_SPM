import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

//CSS
import './App.css'
import Home from './pages/Home';
import Listings from './pages/Listings';
import Listing from './pages/Listing';
import RootLayout from './layouts/RootLayout';
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom';



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
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route
          path="/listings/:id"
          element={<Listing />}
        />

      </Route>
    )
  )

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossOrigin="anonymous"
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
