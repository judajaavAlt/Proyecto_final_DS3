import React, { useRef } from "react";
import "./AccorntG.css";

interface ButtonGProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  url?: string;
  text?: string;
}

const ButtonG: React.FC<ButtonGProps> = ({
  onClick,
  children,
  type = "button",
  url = "",
  text = "BLANK",
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const createRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const anchor = buttonRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    anchor.appendChild(ripple);
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
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      ref={buttonRef}
      className={`btn ripple-btn`}
      onMouseDown={(e) => {
      createRipple(e as React.MouseEvent<HTMLAnchorElement>);
      }}
      onMouseUp={endRipple}
      onMouseLeave={endRipple}
      onTouchEnd={endRipple}
      onTouchCancel={endRipple}
    >
      {children}
      <span className="txt">{text ?? "BLANK"}</span>
    </a>
  );
};

export default ButtonG;
