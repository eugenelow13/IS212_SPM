import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalJob() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  console.log("in Modal:",window.sessionStorage.getItem("roledata"));
  // const roleinfo = window.sessionStorage.getItem("roledata");
  console.log(JSON.parse(sessionStorage.roledata));
  var roleinfo = JSON.parse(sessionStorage.roledata);
  console.log(roleinfo.role_name);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>{roleinfo.role_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p> <strong>Country | Department: </strong>{roleinfo.country} | {roleinfo.dept} </p>
         <p> <strong>Skills Required: </strong> <br></br>{roleinfo.role_skills.join(", ")} </p>
         <p><strong>Skills Matched:</strong> {roleinfo.skillmatch}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            alert("API CALL HERE")
          }}>Apply</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalJob;