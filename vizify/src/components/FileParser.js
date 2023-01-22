import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    fetch("http://localhost:3000")
      .then(response => response.json())
      .then(data => this.setState({ data }));

  }

  render() {
    return (
      <div>
        {/* Render the data here */}
      </div>
    );
  }
}

export default MyComponent;
