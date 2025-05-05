
import { useEffect } from "react";

interface CapybaraScreamerProps {
  countDown: number;
}

const CapybaraScreamer = ({ countDown }: CapybaraScreamerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full max-w-lg">
        <div className="animate-pulse text-white text-4xl absolute top-4 right-4">{countDown}</div>
        <img 
          src="https://cdn.poehali.dev/files/a7811ae5-dfc5-4116-8c47-049147d2e52e.jpg" 
          alt="Капибара-супергерой" 
          className="w-full animate-bounce"
        />
        <h1 className="text-white text-4xl font-bold text-center mt-4 animate-pulse">КАПИБАРА-СУПЕРГЕРОЙ!</h1>
      </div>
    </div>
  );
};

export default CapybaraScreamer;
