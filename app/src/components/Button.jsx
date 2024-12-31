const Button = (props) => {
  return (
    <button
      className={`rounded-md ${props.buttonClass} font-bold p-[5px] w-[120px]`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
