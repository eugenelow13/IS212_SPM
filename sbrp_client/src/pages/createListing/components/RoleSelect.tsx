import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';

// Type Definitions ||
import type { Role } from '../ListingForm';
import { useFoundValue } from '../createListingUtilities';

type Data = {
  roles: Role[];
}

// Component ||
export default function RoleSelect({ selectedRole, setSelectedRole, roles, listingToEdit }) {

  useFoundValue(setSelectedRole, roles, "role_name", listingToEdit?.role_name)

  return (
    <>
      <Form.Label htmlFor="role_name">
        Role Name <span className='text-danger'>*</span>
      </Form.Label>

      <Select
        isDisabled={listingToEdit ? true : false}
        value={selectedRole}
        className="basic-single"
        classNamePrefix="select"
        isSearchable={true}
        placeholder="Select Role..."
        name="role_name"
        id="role_name"
        options={roles}
        getOptionLabel={role => role.role_name}
        getOptionValue={role => role.role_name}
        // components={{ Option: customOption }}
        onChange={value => {
          setSelectedRole(value)
        }}
        required
      />

      {listingToEdit
        && <input type="hidden" name="role_name" value={selectedRole?.role_name} />}

    </>
  )
}
