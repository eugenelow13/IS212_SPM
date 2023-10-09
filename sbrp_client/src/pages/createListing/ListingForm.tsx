import React, { useEffect, useState } from 'react';
import { Form, useActionData, useLoaderData } from 'react-router-dom';

import axios from 'axios';
import { ENDPOINTS, mock, useFetchedData, useIsLoading } from '../../common/utilities';

import ManagerSelect from './components/ManagerSelect';
import RoleDesc from './components/RoleDesc';
import RoleSelect from './components/RoleSelect';
import SkillCard from './components/SkillCard';
import CountrySelect from './components/CountrySelect';

import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';

import StatusToast from '../../common/StatusToast';
import { SubmitButton } from '../../common/SubmitButton';
import { useNow } from '../../common/utilities';

import DateRangePicker from './components/DateRangePicker';

export type Role = {
  role_name: string,
  role_desc: string,
  role_skills: string[]
};

export interface IFormData {
  role_name: string;
  start_date: string;
  end_date: string;
  rep_manager_id: number;
  country: string
}


function fetchRoles(): Promise<Role[]> {
  return axios.get(ENDPOINTS.roles)
    .then(response => response.data.roles);
}

function fetchStaffs() {
  return axios.get(ENDPOINTS.staffs)
    .then(response => response.data.staff);
}


export default function ListingForm() {

  // const [formData, setformData] = useState({
  //   role_name: "",
  //   start_date: null,
  //   end_date: null
  // })
  const listingToEdit = useLoaderData();


  // start and end date should be null at the start?
  const [startDate, setStartDate] = useState<Date | null>(new Date(listingToEdit?.start_date) ?? null);
  const [endDate, setEndDate] = useState<Date | null>(new Date(listingToEdit?.end_date) ?? null);

  // create roleData state variable and get data to set roleData
  const [roles, setRoles] = useState<Role[] | []>([]);
  const [repManagers, setRepManagers] = useState();

  useFetchedData({ fetchFn: fetchRoles, setState: setRoles });
  useFetchedData({ fetchFn: fetchStaffs, setState: setRepManagers });


  const [selectedRole, setSelectedRole] = useState(listingToEdit ?? {
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

      {/* <h3>Create Listing</h3> */}

      <Form action="/listings/new" method="post">


        <Container className="p-0">
          <h4 className='my-4'>Role Details</h4>
          <Row>
            <Col>
              <RoleSelect
                setSelectedRole={setSelectedRole}
                roles={roles}
                listingToEdit={listingToEdit ?? null}
              // formData={formData}
              // setRoleName={setformData}
              />
            </Col>
          </Row>
          <Row >
            <Col sm={6} className='mt-3'>
              <RoleDesc selectedRole={selectedRole} />
            </Col>
            <Col sm={6} className='mt-3'>
              <SkillCard
                selectedRole={selectedRole}
              />
            </Col>
          </Row>

          <h4 className='my-4'>Listing Details</h4>

          <Row>
            <ManagerSelect
              repManagers={repManagers}
              listingToEdit={listingToEdit} />
            <CountrySelect listingToEdit={listingToEdit}/>
          </Row>

          <Row className='mt-3'>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={(date) => setStartDate(new Date(date))}
              setEndDate={(date) => setEndDate(new Date(date))}
            />
          </Row>

          <Row className='mt-3'>
            <Col>
              <SubmitButton isLoading={isLoading}></SubmitButton>
            </Col>
          </Row>

        </Container>


      </Form>
    </>
  )
}





