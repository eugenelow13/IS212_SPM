import { Container } from 'react-bootstrap';
import ListingTable from './components/ListingTable';
import { useLocation } from 'react-router-dom';
import ModalJob from './components/Modal';


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