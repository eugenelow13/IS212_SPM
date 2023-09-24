import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AccessContext } from '../common/AccessProvider';

export default function Home() {

  const {setAccessControl} = useContext(AccessContext);

  const navigation = useNavigate();

  const navigate = (accessControl) =>{
    sessionStorage.setItem("accessControl", accessControl);
    setAccessControl(accessControl)
    navigation(`/listings`)
    // navigation(`/listings/`,{state:{id:accessControl}})
    console.log(accessControl);
  }
  return (
    <div>Home
      <button onClick={()=>navigate('Staff')}>login as Staff</button>
      <button onClick={()=>navigate('Manager')}>Login as Manager</button>
      <button onClick={()=>navigate('HR')}>Login as HR</button>
    </div>
  )
}
