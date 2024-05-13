/* eslint-disable react/prop-types */
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function SelectBox({ children: selectBox }) {
  return (
    <div className="select-box">
      {selectBox}
      <span className="icon">
        <FontAwesomeIcon icon={faAngleDown} />
      </span>
    </div>
  );
}
