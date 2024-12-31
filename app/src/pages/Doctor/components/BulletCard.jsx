import React from "react";

const BulletCard = (props) => {
  const { slot } = props;
  return (
    <div className="font-bold bg-accent text-center text-primary p-2 rounded-md">
      <p>{slot.day}</p>
      <div className="flex items-center justify-between gap-2">
        <p>{slot?.timeSlot?.startTime}</p>
        <p>{"-"}</p>
        <p>{slot?.timeSlot?.endTime}</p>
      </div>
    </div>
  );
};

export default BulletCard;
