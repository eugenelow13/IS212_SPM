import React from 'react'

export default function StaffDetails({ application }) {
    const { applicant, role_listing } = application
    return (
        // bootstrap row-cols-2
        <>
            {/* <h5>Applicant's Details</h5> */}
            <div className="row">
                {/* <div className="col-6">
                <p><strong>Staff ID: </strong>{applicant.staff_id}</p>
            </div> */}
                <div className="col-6">
                    <p><strong>Department: </strong>{applicant.dept}</p>
                </div>
                <div className="col-6">
                    <p><strong>Country: </strong>{applicant.country}</p>
                </div>
            </div>
        </>
    )
}
