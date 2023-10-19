//CSS
import './App.css'

// Page Imports
import Home from './pages/Login/Login';
import ListingFormWithStatusToast, { ListingForm } from './pages/createListing/ListingForm';
import ModalJob from './pages/viewListings/components/Modal';

import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom';

import RootLayout from './common/RootLayout';
import { createListingAction } from './pages/createListing/createListingUtilities';

import { AccessProvider } from './common/AccessProvider';
import { loadListing } from './pages/createListing/createListingUtilities';
import applyToListing from './pages/viewListings/applyToListingUtilities';
import ListingsWithStatusToast from './pages/viewListings/Listings';

function App() {

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route
          action={applyToListing}
          path="/listings"
          element={<ListingsWithStatusToast />}
          >
          <Route
            loader={loadListing}
            path=":id"
            element={<ModalJob />}
          >
          </Route>
          <Route
            path="edit"
            loader={loadListing}
            element={<ListingFormWithStatusToast />}
            action={({ params, request }) => createListingAction({ params, request, method: "put" })}
          ></Route>
        </Route>

        <Route
          path="/listings/new"
          // only triggers for non-get requests
          element={<ListingFormWithStatusToast />}
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
