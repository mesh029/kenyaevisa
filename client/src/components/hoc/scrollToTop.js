import React, { useEffect } from 'react';

const ScrollToTopOnMount = (WrappedComponent) => {
  const ScrollToTop = (props) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ScrollToTop;
};

export default ScrollToTopOnMount;