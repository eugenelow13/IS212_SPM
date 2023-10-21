import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Card, Badge, Alert, Form as BSForm } from 'react-bootstrap'
import { useLoaderData, useNavigate, Form, Link } from 'react-router-dom';
import { useFetchedDataWithParams } from '../../../common/utilities';
import { fetchStaffApplications, getRoleSkillMatchNo } from '../applyToListingUtilities';
import { AccessContext } from '../../../common/AccessProvider';

function ModalJob() {
  const [show, setShow] = useState(true);
  const [appDesc, setAppDesc] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false)

  const navigate = useNavigate();
  const roleInfo = useLoaderData()
  const { currentUser } = useContext(AccessContext)

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
    } else { return false; }
  }

  // const staff_id = sessionStorage.getItem("user");
  // const currentSkills = JSON.parse(sessionStorage.skills);

  const staff_id = currentUser.staff_id;
  const currentSkills = currentUser.staff_skills;

  useFetchedDataWithParams({ fetchFn: fetchStaffApplications, setState: setAlreadyApplied, params: { staff_id, id: roleInfo.id } })

  const acquiredskills = roleInfo.role_skills.filter((skill) => currentSkills.includes(skill));
  const lackingskills = roleInfo.role_skills.filter((skill) => !currentSkills.includes(skill));
  console.log("lackingskills", lackingskills);
  console.log("acquiredskills", acquiredskills);
  console.log("skills", currentSkills);
  console.log(roleInfo.role_name);
  // console.log("roleinfo.skillmatch",roleInfo.skillmatch)
  
  // role skills, skills
  roleInfo.skill_match = getRoleSkillMatchNo(roleInfo.role_skills, currentSkills);

  return (
    <>
      {console.log(alreadyApplied)}
      {console.log(roleInfo)}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{roleInfo.role_name}</Modal.Title>
          {currentUser.role == 4 &&
            <Link
              to="edit"
            >
              <Button
                variant="outline-primary"
                className="ms-2"
              >
                Edit
              </Button>
            </Link>
          }
        </Modal.Header>
        <Form
          action="/listings"
          method="post"
        >
          <Modal.Body>
            <p> <strong>Country | Reporting Manager | Department: </strong>{roleInfo.country} | {roleInfo.manager_name} | {roleInfo.dept} </p>
            <p><strong>Description:</strong><br />
              <div style={{
                height: '200px', overflowY: 'scroll',
                border: '1px lightgrey solid', borderRadius: "5px",
                padding: "5px"
              }}>
                {roleInfo.role_desc}
              </div></p>
            <p> <strong>Skills Required: </strong><br /></p>
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
            <p><strong>Skills Matched:</strong> {roleInfo.skill_match}%</p>

            <input type="hidden" name="staff_id" value={staff_id} />
            <input type="hidden" name="id" value={roleInfo.id} />

            {(allowApply() && !alreadyApplied) ? (
              <BSForm.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <BSForm.Label >Self-description (optional)</BSForm.Label>
                <BSForm.Control name="app_desc" as="textarea" rows={3} value={appDesc} onChange={e => setAppDesc(e.target.value)} />
              </BSForm.Group>
            ) : (
              <>
                {alreadyApplied ? (<Alert variant="danger">You have already applied for this role!</Alert>) : (<Alert variant="danger">This role is not currently open for application. Please refer to the date window for application</Alert>)}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary"
              type="submit"
              disabled={(allowApply() && !alreadyApplied) ? false : true}
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