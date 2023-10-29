import { Component } from "react";
import "./App.css";
import SearchPage from "./pages/SearchPage.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

class App extends Component<object, object> {
  render() {
    return (
      <>
        <ErrorBoundary>
          <SearchPage />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
