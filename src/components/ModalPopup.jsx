/* eslint-disable react/prop-types */
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ModalPopup({
  isopen,
  setIsOpen,
  content,
  workBtnContent,
  callbackFunction,
}) {
  function closePopup() {
    setIsOpen(false);
  }

  return (
    <div className={isopen ? "overlay open" : "overlay"} onClick={closePopup}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn round-btn" onClick={closePopup}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>{content}</h2>
        <div className="buttons">
          <button className="work-btn" onClick={callbackFunction}>
            {workBtnContent}
          </button>
          <button className="cancel-btn" onClick={closePopup}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
