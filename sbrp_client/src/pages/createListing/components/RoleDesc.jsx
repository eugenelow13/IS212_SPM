import { Card } from "react-bootstrap"

const RoleDesc = ({ selectedRole }) => {
  return (
    <Card className="mt-3">
        <Card.Header>Description</Card.Header>
        <Card.Body>
          <Card.Title>{selectedRole && selectedRole.role_name}</Card.Title>
          <Card.Text>
            {selectedRole.role_desc ?? "No role selected"}
          </Card.Text>
        </Card.Body>
      </Card>
  )
}

export default RoleDesc;