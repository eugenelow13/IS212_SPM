import { Card } from "react-bootstrap"

export const RoleDesc = ({ selectedRole }) => {
  return (
    <Card className="my-3">
        <Card.Header>Description</Card.Header>
        <Card.Body>
          <Card.Title>{selectedRole && selectedRole.role_name}</Card.Title>
          <Card.Text>
            {selectedRole.role_desc}
          </Card.Text>
        </Card.Body>
      </Card>
  )
}
