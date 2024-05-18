import React, { useRef, useEffect } from "react";

function AutoResizeTextarea(props) {
  const { name, placeholder } = props; // Destructure props to access name and placeholder
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "inherit"; // Reset height to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scroll height
    }
  };

  useEffect(() => {
    // Adjust height on mount and updates
    adjustHeight();

    // Optional: Adjust height on window resize
    window.addEventListener("resize", adjustHeight);
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className="autosize-textarea rounded-lg text-sm"
      name={name} // Ensure the textarea has a name attribute for form submissions
      placeholder={placeholder} // Optionally set a placeholder if needed
      required
      onChange={adjustHeight} // Adjust height whenever text changes
    />
  );
}

export default AutoResizeTextarea;
