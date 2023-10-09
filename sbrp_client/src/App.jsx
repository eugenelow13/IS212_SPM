//CSS
import './App.css'

// Page Imports
import Home from './pages/Login/Login';
import Listings from './pages/viewListings/Listings';
import Listing from './pages/viewListings/Listing';
import ListingForm from './pages/createListing/ListingForm';

import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom';

import RootLayout from './common/RootLayout';
import { createListingAction } from './pages/createListing/ListingForm';
import { AccessProvider } from './common/AccessProvider';

function App() {

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route
          path="/listings/:id"
          element={<Listing />}
        >
          <Route
            path="edit"
            element={<ListingForm />}
          ></Route>
        </Route>

        <Route
          path="/listings/new"
          // only triggers for non-get requests
          element={<ListingForm />}
          action={createListingAction}
        />
      </Route>
    )
  )

  return (
    <>
      <AccessProvider>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
        <RouterProvider router={router} />
      </AccessProvider>
    </>
  )
}

export default App
