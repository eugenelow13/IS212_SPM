import { useParams } from "react-router-dom";
import ListingTable from './components/ListingTable'

export const Listing = () => {
  const { id } = useParams() || 'No ID';
  return (
    <div>Listing {id}</div>
  );

  <ListingTable />
}

export default Listing;