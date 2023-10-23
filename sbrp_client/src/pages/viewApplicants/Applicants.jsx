import { Container } from 'react-bootstrap';
import ApplicantTable from './components/ApplicantsTable';
import { useLocation } from 'react-router-dom';
import { WithStatusToast } from '../../common/WithStatusToast';



const ApplicantsWithStatusToast = WithStatusToast(Applicants);

function Applicants(){
    return (
        <Container>
          <ApplicantTable />
        </Container>
      )
    }
    export default ApplicantsWithStatusToast;
