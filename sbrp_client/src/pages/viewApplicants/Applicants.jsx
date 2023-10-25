import { Container } from 'react-bootstrap';
import ApplicantTable from './components/ApplicantsTable';
import { Outlet } from 'react-router-dom';
import { WithStatusToast } from '../../common/WithStatusToast';



const ApplicantsWithStatusToast = WithStatusToast(Applicants);

function Applicants() {
  return (
    <>
      <Container>
        <ApplicantTable />
      </Container>
      <Outlet />
    </>
  )
}
export default ApplicantsWithStatusToast;
