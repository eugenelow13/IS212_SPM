import React from 'react';
import { Form, useActionData } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { ENDPOINTS, useIsLoading } from '../../common/utilities';
import { mock, useFetchedData } from '../../common/utilities';

import RoleSelect from './components/RoleSelect';
import RoleDesc from './components/RoleDesc';
import SkillCard from './components/SkillCard';

import { Button, Spinner, Row, Col, Container } from 'react-bootstrap';
import moment from 'moment';

import StatusToast from '../../common/StatusToast';
import { useNow } from '../../common/utilities';

export type Role = {
  role_name: string,
  role_desc: string,
  role_skills: string[]
};

interface IFormData {
  role_name: string;


}

mock.onPost(ENDPOINTS.listings).reply(200, {
  success: false
})

// Form submit action
export async function createListingAction({ request }) {
  const formData = await request.formData();
  // copy of formData
  let body = { ...Object.fromEntries(formData) };

  // extract fields to prevent injection
  const { role_name, } = body;
  body = { role_name } as IFormData;
  console.table(body);

  const actionData = {
    time: moment(),
    success: false,
    message: ""
  }
  // Post form response to axios
  try {
    const createListingResponse = await axios.post(
      ENDPOINTS.listings,
      body,
    )
    actionData.success = true;
    actionData.message = `Submission of ${body.role_name} successful!`;

    return actionData;
  }
  catch (responseErr) {
    console.log(responseErr.message);
    actionData.message = `Submission of ${body.role_name} failed: ${responseErr.message}!`;

    return actionData;
  }

}

function fetchRoles(): Promise<Role[]> {
  return axios.get(ENDPOINTS.roles)
    .then(response => response.data.roles);
}

export default function ListingForm() {
  const [formData, setformData] = useState({
    role_name: ""

  })

  // create roleData state variable and get data to set roleData
  const [roleData, setRoleData] = useState<Role[] | []>([]);
  useFetchedData({ fetchFn: fetchRoles, setState: setRoleData });

  const [selectedRole, setSelectedRole] = useState<Role>({
    role_name: "",
    role_desc: "No role selected.",
    role_skills: []
  });

  const formActionData = useActionData();
  const [showToast, setShowToast] = useState(false);

  // Get current time: updated every 1s
  const now = useNow();

  const isLoading = useIsLoading();

  // if formActionData present
  useEffect(() => {
    formActionData && setShowToast(true);
  }, [formActionData])


  return (
    <>

      <StatusToast
        showToast={showToast}
        setShowToast={setShowToast}
        now={now}
        actionData={formActionData} />

      <h3>Create Listing</h3>

      <Form action="/listings/new" method="post">

        <RoleSelect
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          roleData={roleData}
          setRoleData={setRoleData}
        // formData={formData}
        // setRoleName={setformData}
        />

        <Container className="p-0">
          <Row>
            <Col sm={6}>
              <RoleDesc selectedRole={selectedRole}/>
            </Col>
            <Col sm={6}>
              <SkillCard
                selectedRole={selectedRole}
              />
            </Col>
          </Row>
        </Container>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading
            ? <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true" />
            : "Submit"
          }
        </Button>

      </Form>
    </>
  )
}




