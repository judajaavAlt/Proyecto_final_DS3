import React, { useRef } from "react";
import "./ButtonG.css";

interface ButtonGProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  text?: string;
}

const ButtonG: React.FC<ButtonGProps> = ({
  onClick,
  children,
  type = "button",
  className = "",
  text = "BLANK",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    rippleRef.current = ripple;

    requestAnimationFrame(() => {
      ripple.classList.add("expand");
    });
  };

  const endRipple = () => {
    const ripple = rippleRef.current;
    if (!ripple) return;

    ripple.classList.remove("expand");
    ripple.classList.add("fade");
    ripple.addEventListener("transitionend", () => ripple.remove(), {
      once: true,
    });
    rippleRef.current = null;
  };

  return (
    <button
      type={type}
      ref={buttonRef}
      className={`btn ripple-btn ${className}`}
      onMouseDown={(e) => {
        createRipple(e);
      }}
      onMouseUp={endRipple}
      onMouseLeave={endRipple}
      onTouchEnd={endRipple}
      onTouchCancel={endRipple}
      onClick={onClick}
    >
      {children}
      
    </button>
  );
};

export default ButtonG;
