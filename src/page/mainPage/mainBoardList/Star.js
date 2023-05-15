import { FaStar } from "react-icons/fa";

const Star = ({ selected = false, onSelect = (f) => f }) => (
  <FaStar color={selected ? "hsl(46, 82%, 67%)" : "grey"} onClick={onSelect} />
);

export default Star;
