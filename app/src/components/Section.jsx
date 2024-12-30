const Section = (props) => {
  return (
    <div className={`p-[20px] ${props.sectionClass}`}>{props.children}</div>
  );
};

export default Section;
