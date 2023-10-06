import Select, { components } from 'react-select'


export default function ManagerSelect({ repManagerData }) {
    const customOption = (props) => {
        const { data, label } = props;
        return (
            <components.Option {...props}>
                {label}
                <span style={{ opacity: 0.5, fontSize: "0.9rem", marginLeft: "0.4rem" }}>
                    {` Staff ID: ${data.staff_id} Dept: ${data.dept}`}
                </span>
            </components.Option>
        )
    };
    return (
        <>
            {/* {repManagerData && 
            } */}
            <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                placeholder="Select Reporting Manager..."
                name="rep_manager_id"
                id="rep_manager_id"
                options={repManagerData}
                getOptionLabel={staff => `${staff.staff_fname} ${staff.staff_lname}`}
                getOptionValue={staff => staff.staff_id}
                components={{ Option: customOption }}
            // onChange={value => setSelectedRepManager(value)}
            />
        </>
    );
}

