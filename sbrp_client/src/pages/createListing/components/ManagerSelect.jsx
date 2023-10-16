import { useEffect, useState } from 'react';
import Select, { components, createFilter } from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';
import { useFoundValue } from '../createListingUtilities';


export default function ManagerSelect({ repManagers, listingToEdit }) {

    const [selectedRepManager, setSelectedRepManager] = useState('');

    useFoundValue(setSelectedRepManager, repManagers, "staff_id", listingToEdit?.manager_id)

    const RepManagerData = (props) => {
        return (<span style={{
            opacity: 0.5,
            fontSize: "0.9rem",
            marginLeft: "0.4rem"
        }}>
            {`Staff ID: ${props.data.staff_id} Dept: ${props.data.dept}`}
        </span>);
    }

    const CustomOption = (props) => {
        const { data, label } = props;
        return (
            <components.Option {...props}>
                {label}
                <RepManagerData data={data} />
            </components.Option>
        )
    };

    const CustomSingleValue = ({ children, ...props }) => {
        return (
            <components.SingleValue {...props}>
                {children}
                <RepManagerData data={props.data} />
            </components.SingleValue>
        )
    }

    return (
        <>

            <Col sm={6} md={4}>
                <Form.Label htmlFor="manager_id">
                    Reporting Manager <span className='text-danger'>*</span>
                </Form.Label>
                <Select
                    value={selectedRepManager}
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={true}
                    placeholder="Search by name or staff ID..."
                    name="manager_id"
                    id="manager_id"
                    options={repManagers}
                    getOptionLabel={staff => `${staff.staff_fname} ${staff.staff_lname}`}
                    getOptionValue={staff => staff.staff_id}
                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                    onChange={value => setSelectedRepManager(value)}
                    filterOption={createFilter({ ignoreAccents: false })}
                    required
                />
            </Col>
            <Col sm={6} md={4}>
                <Form.Label htmlFor="dept">Department </Form.Label>
                <Form.Control
                    placeholder={selectedRepManager.dept}
                    id="dept"
                    type="text"
                    disabled
                    readOnly
                >

                </Form.Control>
            </Col>

        </>
    );
}

