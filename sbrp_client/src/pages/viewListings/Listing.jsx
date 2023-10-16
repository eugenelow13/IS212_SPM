import { useParams } from "react-router-dom";

export const Listing = () => {
  const { id } = useParams() || 'No ID';
  return (
    <div>Listing {id}</div>
  );
}

export default Listing;