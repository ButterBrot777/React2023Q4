import "./App.css";
import { SearchPage } from "./pages/SearchPage.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

export const App = () => {
  return (
    <>
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    </>
  );
};
