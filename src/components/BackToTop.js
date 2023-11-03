import { useEffect, useState } from "react";

const BackToTop = () => {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) { // Adjust the threshold to show the button
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
    overflowY: backToTop ? "hidden" : "auto", // Hide the scrollbar when BackToTop button is visible
  };

  return (
    <div style={scrollableStyle}>
      {backToTop && (
        <button
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            width: "50px",
            height: "50px",
            fontSize: "50px",
          }}
          onClick={scrollUp}
        >
          ^
        </button>
      )}
    </div>
  );
};

export default BackToTop;