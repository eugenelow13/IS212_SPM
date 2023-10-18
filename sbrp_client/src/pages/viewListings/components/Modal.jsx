import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Card, Badge, Form as BSForm } from 'react-bootstrap'
import { useLoaderData, useNavigate, Form } from 'react-router-dom';

function ModalJob() {
  const [show, setShow] = useState(true);
  const [appDesc, setAppDesc] = useState("");

  const navigate = useNavigate();
  const roleInfo = useLoaderData()

  const handleClose = () => {
    setShow(false);
    navigate("/listings");

  }
  const allowApply = () => {
    let startDate = new Date(roleInfo.start_date);
    let endDate = new Date(roleInfo.end_date);
    let dateNow = new Date();
    if (dateNow >= startDate && dateNow <= endDate) {
      return true;
    }else{return false;}
  }

  const staff_id = sessionStorage.getItem("user");
  const skills = JSON.parse(sessionStorage.skills);

  const acquiredskills = roleInfo.role_skills.filter((skill) => skills.includes(skill));
  const lackingskills = roleInfo.role_skills.filter((skill) => !skills.includes(skill));
  console.log("lackingskills", lackingskills);
  console.log("acquiredskills", acquiredskills);
  console.log("skills", skills);
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
        <Form
          action="/listings"
          method="post"
        >
          <Modal.Body>
            <p> <strong>Country | Department: </strong>{roleInfo.country} | {roleInfo.dept} </p>
            <p> <strong>Skills Required: </strong> <br></br></p>
              <Container className="d-flex flex-wrap p-0 mb-3">
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
            <p><strong>Skills Matched:</strong> {roleInfo.skillmatch} %</p>

            <input type="hidden" name="staff_id" value={staff_id} />
            <input type="hidden" name="id" value={roleInfo.id} />

            <BSForm.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <BSForm.Label>Self-description (optional)</BSForm.Label>
              <BSForm.Control name="app_desc" as="textarea" rows={3} value={appDesc} onChange={e => setAppDesc(e.target.value)} />
            </BSForm.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary"
              type="submit"
              disabled={allowApply() ? false : true}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Form >
      </Modal >
    </>
  );
}

export default ModalJob;