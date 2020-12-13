import React from "react";
import classNames from "classnames/bind";
import styles from "./Header/Header.scss";
import Header from "./Header";

const cx = classNames.bind(styles);

const MainStructure = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);

export default MainStructure;