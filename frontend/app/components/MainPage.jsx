import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 'API not hit'
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(result => result.text())
      .then(result => {
        this.setState({
          response: result
        });
      });
  }

  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            API says: {response}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
