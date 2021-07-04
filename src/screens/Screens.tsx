import React, { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";
import HomeScreen from "./home/HomeScreen";

interface Props {}

export default function Screens({}: Props): ReactElement {
  return (
    <>
      <Router>
        <HomeScreen />
      </Router>
    </>
  );
}
