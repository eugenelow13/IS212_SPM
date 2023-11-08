import React from 'react'
import { Container, Card, Badge } from 'react-bootstrap'

export default function SkillCard({ selectedRole }) {
    return (
        <Card>
            <Card.Header>Skills</Card.Header>
            <Card.Body>
                {selectedRole?.role_skills.length > 0
                    ? <Container className="d-flex flex-wrap p-0">
                        {selectedRole.role_skills.map((skill, index) => (
                            <Badge
                                key={index}
                                className='m-1'
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
