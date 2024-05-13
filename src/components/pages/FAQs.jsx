// React Hooks
import { useState, useEffect } from "react";
// Get FAQs Arr
import faqsObj from "../../assets/json/faqs.json";
// React JSX Components
import FAQBox from "../FAQBox";

export default function FAQs() {
  const [faqsArr, setFaqsArr] = useState([]);

  useEffect(() => {
    setFaqsArr(faqsObj.faqs);
  }, []);

  return (
    <main className="faqs">
      <div className="container">
        <div className="header">
          <h2>Frequency Questions</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, ex
            perspiciatis. Dolorem dolor nam recusandae. Tempora sapiente
            deserunt at? Expedita.
          </p>
        </div>

        <div className="faqs-wrapper">
          {faqsArr.map((faq, i) => {
            return (
              <FAQBox key={i} question={faq.question} answer={faq.answer} />
            );
          })}
        </div>
      </div>
    </main>
  );
}
