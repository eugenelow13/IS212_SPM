import React, { Component } from 'react';


class SkillMatchBadges extends Component {
    render() {
        return (
            function SkillMatchBadges(props) {
  return (<Container className="d-flex flex-wrap p-0 mb-3">
    {props.acquiredskills.map((skill, index) => <Badge key={index} className='m-1' bg='success'>
      {skill}
    </Badge>)}
    {props.lackingskills.map((skill, index) => <Badge key={index} className='m-1' bg='secondary'>
      {skill}
    </Badge>)}
  </Container>);
}
        );
    }
}

export default SkillMatchBadges;