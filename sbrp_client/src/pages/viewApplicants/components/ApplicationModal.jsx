import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useLoaderData, useNavigate, Outlet } from 'react-router-dom'
import SkillMatchBadges from '../../../common/SkillMatchBadges';
import ListingDetailsCollapse from './ListingDetailsCollapse';
import { getAcquiredSkills, getLackingSkills, getRoleSkillMatchNo } from '../../../common/utilities';
import StaffDetails from './StaffDetails';

export default function ApplicationModal() {
  const application = useLoaderData();
  const { applicant, role_listing } = application;

  const acquiredSkills = getAcquiredSkills(role_listing.role_skills, applicant.staff_skills)
  const lackingSkills = getLackingSkills(role_listing.role_skills, applicant.staff_skills)
  const skillMatch = getRoleSkillMatchNo(role_listing.role_skills, applicant.staff_skills)

  const navigate = useNavigate()
  const [show, setShow] = useState(true);

  const unshowAndNavigate = () => {
    setShow(false);
    navigate("/applications")
  }

  return (
    <Modal
      show={show}
      onHide={unshowAndNavigate}
    >
      <Modal.Header closeButton>
        <Modal.Title>{application.staff_name} ({application.staff_id})</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* <Outlet/> */}
        <ListingDetailsCollapse
          application={application}
        />
        <p><strong>Dept | Country: </strong>{applicant.dept} | {applicant.country}</p>
        <p><strong>Skills Matched: </strong>{skillMatch}%</p>
        <SkillMatchBadges
          acquiredSkills={acquiredSkills}
          lackingSkills={lackingSkills}
        ></SkillMatchBadges>

        <p><strong>Applicant Self-Description: </strong></p>
        <div className="border rounded-2 p-2" style={{ overflow: 'scroll', maxHeight: '10rem' }}>
          {application.app_desc}
        </div>

      </Modal.Body>
    </Modal>
  )
}
