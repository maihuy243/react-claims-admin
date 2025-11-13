import React from "react";
import { cn } from "@/lib/utils";

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("bg-white rounded-xl shadow-lg p-3 md:p-3", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Wrapper;
