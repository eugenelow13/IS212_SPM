import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Card, Badge } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom';

function ModalJob() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const roleInfo = useLoaderData()

  const handleClose = () => {
    setShow(false);
    navigate("/listings");

  }
  // const handleShow = () => setShow(true);
  // console.log("in Modal:",window.sessionStorage.getItem("roledata"));
  // const roleinfo = window.sessionStorage.getItem("roledata");
  // console.log(JSON.parse(sessionStorage.roledata));
  // var roleInfo = JSON.parse(sessionStorage.roledata);
  const skills = JSON.parse(sessionStorage.skills);

  const acquiredskills = roleInfo.role_skills.filter((skill)=>skills.includes(skill));
  const lackingskills = roleInfo.role_skills.filter((skill)=>!skills.includes(skill));
  console.log("lackingskills",lackingskills);
  console.log("acquiredskills",acquiredskills);
  console.log("skills",skills);
  console.log(roleInfo.role_name);
  // console.log("roleinfo.skillmatch",roleInfo.skillmatch)

  // role skills, skills
  const roleSkillsSet = new Set([...roleInfo.role_skills])
  const matchingSkills = skills.filter(skill => roleSkillsSet.has(skill))
  roleInfo.skillmatch = (matchingSkills.length / roleSkillsSet.size * 100).toFixed(0)

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
        <Modal.Title>{roleInfo.role_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p> <strong>Country | Department: </strong>{roleInfo.country} | {roleInfo.dept} </p>
         <p> <strong>Skills Required: </strong> <br></br>{roleInfo?.role_skills.length > 0
                    ? <Container className="d-flex flex-wrap p-0">
                        {acquiredskills.map((skill, index) => (
                          
                            <Badge
                                key={index}
                                className='m-1'
                                bg='success'>
                                {skill}
                            </Badge>
                        ))}
                        {lackingskills.map((skill, index) => (
                          
                          <Badge
                              key={index}
                              className='m-1'
                              bg='secondary'>
                              {skill}
                          </Badge>
                      ))}
                    </Container>
                    : <Card.Text>No role selected.</Card.Text>
                }</p>
         <p><strong>Skills Matched:</strong> {roleInfo.skillmatch} %</p>
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