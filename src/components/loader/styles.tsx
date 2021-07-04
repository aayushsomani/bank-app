import styled from "styled-components";

export const StyledLoader = styled.div`
  .fp-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #f8f8f8ad;
  }
  .fp-container .fp-loader {
    top: calc(50% - 35px);
    left: 55%;
    z-index: 1000;
    position: absolute;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
