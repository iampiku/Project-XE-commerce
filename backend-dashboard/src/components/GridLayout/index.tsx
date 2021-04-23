import React from "react";
import "./style.css";

/** GridLayout for clearUnderstanding */
interface GridLayoutProps {
  children: any;
}
function GridLayout({ children }: GridLayoutProps): JSX.Element {
  return <div className="grid-container">{children}</div>;
}

export default GridLayout;
