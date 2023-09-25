import { Container } from 'react-bootstrap';
import ListingTable from './components/ListingTable';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


// const Listings = () => (

//   <ListingTable />

// )

export default function Listings() {
  const location = useLocation();
  console.log(location.state);
  return (
    <Container>
      <ListingTable />
    </Container>
  )
}