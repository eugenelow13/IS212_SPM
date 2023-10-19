import { Container } from 'react-bootstrap';
import ListingTable from './components/ListingTable';
import { useLocation } from 'react-router-dom';
import { WithStatusToast } from '../../common/WithStatusToast';


// const Listings = () => (

//   <ListingTable />

// )

const ListingsWithStatusToast = WithStatusToast(Listings);

function Listings() {
  const location = useLocation();
  console.log(location.state);
  return (
    <Container>
      <ListingTable />
    </Container>
  )
}
export default ListingsWithStatusToast;
