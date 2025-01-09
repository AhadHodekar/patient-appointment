const ErrorCard = (props) => {
  return (
    <div className="flex justify-center items-center w-full px-[20px] mb-[20px] mt-[90px]">
      <div className="rounded-md text-red-500 bg-red-100 flex items-center w-full p-[15px]">
        <h3>{props.error}</h3>
      </div>
    </div>
  );
};

export default ErrorCard;
