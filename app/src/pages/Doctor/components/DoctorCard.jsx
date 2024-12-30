import { Link } from "react-router-dom";
const DoctorCard = (props) => {
  const { doctor } = props;
  return (
    <Link to={`/doctor/${doctor._id}`}>
      <h2>{doctor.name}</h2>
      <h3>{doctor.specialization}</h3>
      <h3>Fee: {doctor.fee}</h3>
    </Link>
  );
};

export default DoctorCard;
