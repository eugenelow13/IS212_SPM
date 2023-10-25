import { Container, Badge } from "react-bootstrap";

export default function SkillMatchBadges(props) {
    return (<Container className="d-flex flex-wrap p-0 mb-3">
      {props.acquiredSkills.map((skill, index) => <Badge key={index} className='m-1' bg='success'>
        {skill}
      </Badge>)}
      {props.lackingSkills.map((skill, index) => <Badge key={index} className='m-1' bg='secondary'>
        {skill}
      </Badge>)}
    </Container>);
  }