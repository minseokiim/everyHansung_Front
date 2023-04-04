import { FaStar } from "react-icons/fa";

const Star = ({ selected = false, onSelect = (f) => f }) => (
  <FaStar color={selected ? "navy" : "grey"} onClick={onSelect} />
);

export default Star;
