import React, { ReactElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../../constants/contents/SideBarContents";
import { StyledSideBar } from "./styles";

interface Props {}

function SideBar({}: Props): ReactElement {
  const sidebarItems = SIDEBAR_ITEMS;
  const [currentPath, setCurrentPath] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <StyledSideBar>
      {sidebarItems.map((item, k) => {
        const { route, menuIcon } = item;
        return (
          <div key={k} className="nav-wrapper">
            <Link
              className={
                currentPath === route ? "nav-container active" : "nav-container"
              }
              to={route}
            >
              <i className={menuIcon}></i>
            </Link>
          </div>
        );
      })}
    </StyledSideBar>
  );
}

export default SideBar;
