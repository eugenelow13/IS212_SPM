import Select from 'react-select'

export default function ManagerSelect() {
    return (
        <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            placeholder="Select Manager..."
            name="manager_id"
            id="role_name"
            options={data}
            getOptionLabel={role => role.role_name}
            getOptionValue={role => role.staff_id}
            components={{ Option: customOption }}
            onChange={value => setSelectedRole(value)}
        />
    )
}

