import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className="shadow-card p-10 rounded-card bg-white w-full">
      {children}
    </div>
  );
};

export default Card;
