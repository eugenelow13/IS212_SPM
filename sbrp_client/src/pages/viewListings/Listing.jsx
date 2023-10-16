
import { Outlet, useParams } from "react-router-dom";
import ListingTable from './components/ListingTable'

export const Listing = () => {
  const { id } = useParams() || 'No ID';
  return (
    <>
      <h3>Listing {id}</h3>
      {<Outlet />}
    </>
  );
}

export default Listing;