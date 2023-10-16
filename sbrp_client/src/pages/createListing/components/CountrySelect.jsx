import { useState } from 'react';
import Select, { components, createFilter } from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';

const countries = [
    { name: 'Singapore', iso_code: 'SG' },
    { name: 'Malaysia', iso_code: 'MY' },
    { name: 'Indonesia', iso_code: 'ID' },
    { name: 'Vietnam', iso_code: 'VN' },
    { name: 'Hong Kong', iso_code: 'HK' }
]

export default function CountrySelect() {

    // const RepManagerData = (props) => {
    //     return (<span style={{
    //         opacity: 0.5,
    //         fontSize: "0.9rem",
    //         marginLeft: "0.4rem"
    //     }}>
    //         {` Staff ID: ${props.data.staff_id} Dept: ${props.data.dept}`}
    //     </span>);
    // }

    // const CustomOption = (props) => {
    //     const { data, label } = props;
    //     return (
    //         <components.Option {...props}>
    //             {label}
    //             <RepManagerData data={data} />
    //         </components.Option>
    //     )
    // };

    // const CustomSingleValue = ({ children, ...props }) => {
    //     return (
    //         <components.SingleValue {...props}>
    //             {children}
    //             <RepManagerData data={props.data} />
    //         </components.SingleValue>
    //     )
    // }

    return (
        <Col sm={6} md={4}>
            <Form.Label htmlFor="country">
                Country <span className='text-danger'>*</span> 
            </Form.Label>
            <Select
                className="basic-single"
                classNamePrefix="select"
                // isSearchable={true}
                placeholder="Select Country"
                name="country"
                id="country"
                options={countries}
                getOptionLabel={country => country.name}
                getOptionValue={country => country.name}
                // components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                // filterOption={createFilter({ ignoreAccents: false })}
                onChange={value => console.log(value)}
                required
            />
        </Col>
    );
}

