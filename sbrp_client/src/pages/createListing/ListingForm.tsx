import React, { useEffect, useState } from 'react';
import { Form, Link, useLoaderData } from 'react-router-dom';

import axios from 'axios';
import { ENDPOINTS, mock, useFetchedData, useIsLoading } from '../../common/utilities';

import ManagerSelect from './components/ManagerSelect';
import RoleDesc from './components/RoleDesc';
import RoleSelect from './components/RoleSelect';
import SkillCard from './components/SkillCard';
import CountrySelect from './components/CountrySelect';

import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';

import { SubmitButton } from '../../common/SubmitButton';

import DateRangePicker from './components/DateRangePicker';
import { WithStatusToast } from '../../common/WithStatusToast';
import { fetchStaffs } from '../../common/utilities';

export type Role = {
  role_name: string,
  role_desc: string,
  role_skills: string[]
};

export interface IFormData {
  role_name: string;
  start_date: string;
  end_date: string;
  manager_id: number;
  country: string
}


// mock?.onPost(ENDPOINTS.listings).reply(200, {
//   success: false
// });

// Form submit action


function fetchRoles(): Promise<Role[]> {
  return axios.get(ENDPOINTS.roles)
    .then(response => response.data.roles);
}

const ListingFormWithStatusToast = WithStatusToast(ListingForm);
export default ListingFormWithStatusToast;


export function ListingForm() {

  const listingToEdit = useLoaderData();

  // start and end date should be null at the start?
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (listingToEdit) {
      setStartDate(new Date(listingToEdit?.start_date))
      setEndDate(new Date(listingToEdit?.end_date))
    }
  }, [])


  // create roleData state variable and get data to set roleData
  const [roles, setRoles] = useState<Role[] | []>([]);
  const [repManagers, setRepManagers] = useState();

  useFetchedData({ fetchFn: fetchRoles, setState: setRoles });
  useFetchedData({ fetchFn: fetchStaffs, setState: setRepManagers });


  const [selectedRole, setSelectedRole] = useState();

  const isLoading = useIsLoading();

  return (
    <>

      <Form
        action={listingToEdit ? `/listings/${listingToEdit?.id}/edit` : "/listings/new"}
        method="post"
      >


        <Container className="p-0">
          <h4 className='my-4'>Role Details</h4>
          <Row>
            <Col>
              <RoleSelect
                selectedRole={selectedRole}
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

          <h4 className='my-4'>{listingToEdit && "Edit "}Listing Details</h4>

          <Row>
            <ManagerSelect
              repManagers={repManagers}
              listingToEdit={listingToEdit}
            />

            <CountrySelect listingToEdit={listingToEdit} />
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
              <SubmitButton isLoading={isLoading} text={listingToEdit ? "Edit" : "Submit"}></SubmitButton>
              {listingToEdit &&
                <Link
                  to=".."
                  relative="path"
                >
                  <Button
                    variant="outline-primary ms-1"  
                  >
                    Back to Listing
                  </Button>
                </Link>
              }
            </Col>
          </Row>

        </Container>


      </Form>
    </>
  )
}





