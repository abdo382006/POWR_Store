/* eslint-disable react/prop-types */
// Font Awesome Library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// React Hooks
import { useState } from "react";

export default function FAQBox({ question, answer }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="faq-box">
      <h4 onClick={() => setIsShown((p) => !p)}>
        {question}
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </h4>
      <p className={isShown ? "show" : ""}>{answer}</p>
    </div>
  );
}
