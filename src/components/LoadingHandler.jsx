import React from "react";

const LoadingHandler = ({ loading, error , children }) => {
  const returnHandler = () => {
    if (children?.type?.render?.displayName === "Button") {
      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        "Loading..."
      );
      return (
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
              {children}
              <p>
                <br />
                {error}
              </p>
            </>
          ) : (
            children
          )}
        </>
      );
    } else {
      return (
        <>
          {loading ? (
            <tr>
              <td colSpan={3}>loading please wait...</td>
            </tr>
          ) : error ? (
            error
          ) : (
            children
          )}
        </>
      );
    }
  };
  return returnHandler();
};

export default LoadingHandler;
