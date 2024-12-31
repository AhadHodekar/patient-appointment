import React from "react";

const Bullet = (props) => {
  return (
    <div className={`${props.bulletClass} rounded-md p-1 font-bold`}>
      {props.children}
    </div>
  );
};
export default Bullet;
