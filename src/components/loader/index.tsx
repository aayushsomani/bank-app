import React, { ReactElement, useState } from "react";
import { StyledLoader } from "./styles";

function LoaderHOC(WrappedComponent: any, loadingMessage: string): any {
  function HOC(props: any): any {
    const [isLoading, setLoading] = useState(true);
    const setLoadingState = (isComponentLoading: boolean) => {
      setLoading(isComponentLoading);
    };
    return (
      <>
        {isLoading && (
          <StyledLoader>
            <div className="loader fp-container">
              <img
                width="70"
                height="70"
                src="https://i.imgur.com/fXUIBfi.gif"
                className=" fp-loader"
                alt="loading"
              />
            </div>
          </StyledLoader>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  }
  return HOC;
}
export default LoaderHOC;
