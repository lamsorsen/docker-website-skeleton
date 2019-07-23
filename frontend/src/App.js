import React from 'react';
import logo from './logo.svg';
import './App.css';

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
      .then((result) => {
        this.setState({
          response: result
        });
      });
  }

  render() {
    const {response} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            API says: {response}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
