import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Listings = () => (
  <Container className='mt-3'>
    <h1>Listings</h1>
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <Link to={`${item}`}>{item}</Link>
        </li>
      ))}
    </ul>
  </Container>
)

export default Listings;