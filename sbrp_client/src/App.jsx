//CSS
import './App.css'

// Page Imports
import Login from './pages/Login/Login';
import ListingFormWithStatusToast, { ListingForm } from './pages/createListing/ListingForm';
import ModalJob from './pages/viewListings/components/Modal';

import { createBrowserRouter, createRoutesFromChildren, Navigate, redirect, Route, RouterProvider } from 'react-router-dom';

import RootLayout from './common/RootLayout';
import { createListingAction } from './pages/createListing/createListingUtilities';

import { AccessProvider } from './common/AccessProvider';
import { loadListing } from './pages/createListing/createListingUtilities';
import applyToListing from './pages/viewListings/applyToListingUtilities';
import ListingsWithStatusToast from './pages/viewListings/Listings';
import { useContext } from 'react';
import { redirectIfNotLoggedInFactory } from './common/sessionUtilities';

const pageProtector = redirectIfNotLoggedInFactory(() => null)

function App() {

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
          <Route
            action={applyToListing}
            loader={pageProtector}
            path="/listings"
            element={<ListingsWithStatusToast />}
          >
            <Route
              loader={redirectIfNotLoggedInFactory(loadListing)}
              path=":id"
              element={<ModalJob />}
            >
            </Route>
          </Route>
          <Route
            path="listings/:id/edit"
            loader={redirectIfNotLoggedInFactory(loadListing)}
            element={<ListingFormWithStatusToast />}
            action={({ params, request }) => createListingAction({ params, request, method: "put" })}
          ></Route>

          <Route
            path="/listings/new"
            loader={pageProtector}
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
