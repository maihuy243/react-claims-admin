// src/components/ui/divider.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className,
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "w-px h-6 bg-gray-200 mx-3",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "h-px w-full bg-gray-200 my-2",
        className
      )}
    />
  );
};

export default Divider;
