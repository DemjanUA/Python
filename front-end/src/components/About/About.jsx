import React from 'react';
import Paper from '../Paper';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <div className="about__page-wrapper">
          About
        </div>
      </Paper>
    )
  }
}

export default About;