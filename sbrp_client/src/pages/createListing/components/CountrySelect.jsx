import { useState } from 'react';
import Select, { components, createFilter } from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';

const countries = [
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Vietnam', label: 'Vietnam' },
    { value: 'Hong Kong', label: 'Hong Kong' }
]

export default function CountrySelect({ listingToEdit }) {

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

    const [selectedCountry, setselectedCountry] = useState({value: listingToEdit?.country, label: listingToEdit?.country})

    return (
        <Col sm={6} md={4}>
            <Form.Label htmlFor="country">
                Country <span className='text-danger'>*</span>
            </Form.Label>
            <Select
                value={selectedCountry}
                className="basic-single"
                classNamePrefix="select"
                // isSearchable={true}
                placeholder="Select Country"
                name="country"
                id="country"
                options={countries}
                getOptionLabel={country => country.label}
                getOptionValue={country => country.value}
                filterOption={createFilter({ ignoreAccents: false })}
                onChange={country => setselectedCountry(country)}
                required
            />
        </Col>
    );
}

