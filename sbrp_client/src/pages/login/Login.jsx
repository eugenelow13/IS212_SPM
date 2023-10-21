import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AccessContext } from '../../common/AccessProvider';

import { Alert, Button } from 'react-bootstrap';
import { StaffDropdown } from '../createListing/components/ManagerSelect';

import { fetchStaffs, useFetchedData } from '../../common/utilities';
import { components } from 'react-select';



export default function Login() {
  const [staff, setStaff] = useState([]);

  const { currentUser, setCurrentUser } = useContext(AccessContext);

  const navigation = useNavigate();
  useFetchedData({ fetchFn: fetchStaffs, setState: setStaff })


  return (
    <>
      <Alert variant="primary">
        1: Admin (Jack Sim)<br/>
        2: User (Susan Goh)<br/>
        3: Manager (Derek Tan)<br/>
        4: HR (Benjamin Teo)
      </Alert>
      <StaffDropdown
        staff={staff}
        selectedStaff={currentUser}
        setSelectedStaff={setCurrentUser}
        CustomOption={CustomOption}
        CustomSingleValue={CustomSingleValue}>
      </StaffDropdown>
      {/* <p>{JSON.stringify(currentUser)}</p> */}
      {/* <LoginButtons navigate={navigate}></LoginButtons> */}
      <Link to="/listings">
        <Button
          className='mt-3'
        >Login</Button>
      </Link>
    </>
  )
}

// function LoginButtons(props) {
//   return (<ButtonGroup className="mt-3">
//     <Button variant="outline-primary" onClick={() => props.navigate()}>login as Staff</Button>
//     <Button variant="outline-primary" onClick={() => props.navigate()}>Login as Manager</Button>
//     <Button variant="outline-primary" onClick={() => props.navigate()}>Login as HR</Button>
//   </ButtonGroup>);
// }

const StaffMetaData = (props) => {
  return (<span style={{
    opacity: 0.5,
    fontSize: "0.9rem",
    marginLeft: "0.4rem"
  }}>
    {`Staff ID: ${props.data.staff_id} Dept: ${props.data.dept} Role: ${props.data.role}`}
  </span>);
}

const CustomOption = (props) => {
  const { data, label } = props;
  return (
    <components.Option {...props}>
      {label}
      <StaffMetaData data={data} />
    </components.Option>
  )
};

const CustomSingleValue = ({ children, ...props }) => {
  return (
    <components.SingleValue {...props}>
      {children}
      <StaffMetaData data={props.data} />
    </components.SingleValue>
  )
}

