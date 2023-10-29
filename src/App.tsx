import { Component } from "react";
import "./App.css";
import SearchPage from "./pages/SearchPage.tsx";

class App extends Component {
  constructor(props: object) {
    super(props);
    this.state = {
      // Initialize state if needed
    };
  }

  render() {
    return (
      <>
        <SearchPage />
      </>
    );
  }
}

export default App;
