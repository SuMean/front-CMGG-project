import React from "react";
import css from "./NotLogin.module.scss";
const NotLoginPage = () => {
  return (
    <>
      <div className={css.imgDiv}>
        <div className={css.imgWrapper}>
          <img
            className={css.img}
            src="/images/CGLOGO.png"
            alt="logo"
            width="300"
          />
          <p className={css.p}>로그인 안하면 안보여줌</p>
        </div>
      </div>
    </>
  );
};

export default NotLoginPage;
