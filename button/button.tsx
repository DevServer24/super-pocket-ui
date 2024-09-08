import * as React from "react";
import './button.css'; // Import your CSS file
import { useState,useEffect } from "react";
interface ButtonProps {
  id?: string;
  className?: string;
  onClick?: React.ReactEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit";
  variant?: "default" | "secondary" | "link" | "main"; // Different variants
  onLoading?: boolean// Loading animation handler
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {





  const [loading, setLoading] = React.useState(false);
  // Choose the class based on the variant
  const variantClass = props.variant ? `btn-${props.variant}` : "btn-default";
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      setLoading(true);
      Promise.resolve(props.onClick(e)).finally(() => setLoading(false)); // Resolve onClick and reset loading
    }
  };
  return (
    <button
      className={`btn ${variantClass} ${props.className || ''}`} // Apply the class based on the variant
      id={props.id}
      onClick={props.onClick}
      type={props.type}
      disabled={loading || props.onLoading}
    >
      {
        loading || props.onLoading ? (
          <span className="loading-spinner"></span>
        ) : (
          props.children
        )
      }
    </button>
  );
};

export { Button };
