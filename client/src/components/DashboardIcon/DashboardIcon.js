import React from "react";
import { Icon } from "semantic-ui-react";

const DashboardIcon = ({ icon, color }) => {
  const style = {
    width: "35px",
    height: "35px",
    background: "linear-gradient(-60deg, #9aa0e4, #5642d4)",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "3px"
  };
  return (
    <div style={style}>
      <Icon
        name={icon ? icon : "tasks"}
        inverted
        style={{ margin: 0, fontSize: "1.4em !important" }}
      />
    </div>
  );
};

export default DashboardIcon;
