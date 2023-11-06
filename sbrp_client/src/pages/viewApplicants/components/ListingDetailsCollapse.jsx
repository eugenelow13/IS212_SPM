import React from 'react'
import { Accordion } from 'react-bootstrap'

export default function ListingDetailsCollapse({ application }) {
    const { role_listing } = application;
    return (
        <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    Applying for
                    <b>&nbsp;{role_listing.role_name}&nbsp;</b>
                    (Listing {application.listing_id})
                </Accordion.Header>
                <Accordion.Body>
                    <p>
                        <strong>Country:</strong> {role_listing.country}
                    </p>
                    <p>
                        <strong>Reporting Manager:</strong> {role_listing.manager_name} ({role_listing.manager_id})
                    </p>
                    <p>
                        <strong>Department:</strong> {role_listing.dept}
                    </p>
                    <p><strong>Description:</strong></p>
                        {role_listing.role_desc}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
