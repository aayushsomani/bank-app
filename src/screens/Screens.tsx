import React, { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "../components/error/ErrorBoundary";
import HomeScreen from "./home/HomeScreen";

interface Props {}

export default function Screens({}: Props): ReactElement {
  return (
    <>
      <Router>
        <ErrorBoundary>
          <HomeScreen />
        </ErrorBoundary>
      </Router>
    </>
  );
}
