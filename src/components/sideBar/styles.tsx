import styled, { css } from "styled-components";
export const StyledSideBar = styled.div`
  color: #595959;
  padding: 0.5vw;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 2px 1px 5px 3px #ccc;

  .nav-wrapper {
    margin: 2px 0px;
    &:hover {
      .nav-container {
        transition: 0.3s ease-in;
        color: white;
        background-color: #092a49;
      }
    }
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    height: 5vw;
    text-decoration: none;
  }

  .active {
    color: white;
    background-color: #092a49;
  }
`;
