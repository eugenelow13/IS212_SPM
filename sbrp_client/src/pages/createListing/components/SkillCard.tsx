import React from 'react'
import { Container, Card, Badge } from 'react-bootstrap'

export default function SkillCard({ selectedRole }) {
    return (
        <Card className="my-3">
            <Card.Header>Skills</Card.Header>
            <Card.Body>
                {selectedRole?.role_skills.length > 0
                    ? <Container className="d-flex flex-row p-0">
                        {selectedRole.role_skills.map((skill, index) => (
                            <Badge
                                key={index}
                                className='mx-1'
                                bg='secondary'>
                                {skill}
                            </Badge>
                        ))}
                    </Container>
                    : <Card.Text>No role selected.</Card.Text>
                }
            </Card.Body>
        </Card>
    )
}
