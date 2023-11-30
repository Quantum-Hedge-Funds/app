import { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, onClick }: ButtonProps) => (
  <button
    className="rounded-full px-6 py-3 w-full bg-secondary-600 hover:bg-secondary-800 transition text-white"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
