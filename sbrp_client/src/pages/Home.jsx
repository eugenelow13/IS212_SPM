import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigation = useNavigate();

  const navigate = (accessControl) =>{
    navigation(`/listings/`,{state:{id:accessControl}})
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
