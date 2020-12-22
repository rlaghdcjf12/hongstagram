import React from "react";
import styles from "./LoadingView.scss";
import classNames from "classnames/bind";
import { FadingCircle } from "better-react-spinkit";

const cx = classNames.bind(styles);

const LoadingView = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className={cx("loading-view")}>
      <FadingCircle color={"blue"} size={40} />
    </div>
  );
};

export default LoadingView;