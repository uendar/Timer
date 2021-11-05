import React, { useEffect, useState } from "react";

const Layout = ({ loadingTime }) => {
  const [newStyle, setNewStyle] = useState(null);
  const initStyle = { height: "0%" };

  useEffect(() => {
    if (loadingTime > 0) {
      setNewStyle({
        height: `${loadingTime.toFixed() + "%"}`,
      });
    }
  }, [loadingTime]);

  return (
    <div className="Layout">
      <div
        className="inner-color"
        style={loadingTime !== 0 ? newStyle : initStyle}
      ></div>
    </div>
  );
};

export default Layout;
