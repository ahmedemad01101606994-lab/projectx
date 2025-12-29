import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Rating({ rating, size = 16 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} size={size} className="star filled" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} size={size} className="star filled" />);
    } else {
      stars.push(<FaRegStar key={i} size={size} className="star" />);
    }
  }

  return <div className="d-flex gap-1">{stars}</div>;
}

export default Rating;
