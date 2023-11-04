import "./App.css";
import { SearchPage } from "./pages/SearchPage.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import React from "react";

export const App = () => {
  return (
    <>
        <React.StrictMode>
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>

        </React.StrictMode>
    </>
  );
};
