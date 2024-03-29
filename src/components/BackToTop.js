import { useEffect, useState } from "react";

// styles & images
import './BackToTop.css'
import ScrollUpIcon from "../assets/scroll-up.png";

const BackToTop = () => {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) { 
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollableStyle = {
    overflowY: backToTop ? "hidden" : "auto",
  };

  return (
    <div style={scrollableStyle}>
      {backToTop && (
        <img
        className="scroll-up-icon"
        src={ScrollUpIcon}
        alt="scroll up button"
        onClick={scrollUp}
      />
      )}
    </div>
  );
};

export default BackToTop;